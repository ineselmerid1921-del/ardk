const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM artisan');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM artisan WHERE id_artisan = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { nom, competences, disponibilite, statut, id_atelier } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO artisan (nom, competences, disponibilite, statut, id_atelier) VALUES (?, ?, ?, ?, ?)',
      [nom, competences, disponibilite ?? true, statut || 'ACTIF', id_atelier]
    );
    res.status(201).json({ message: 'Artisan ajouté ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { nom, competences, disponibilite, statut, id_atelier } = req.body;
  try {
    await pool.query(
      'UPDATE artisan SET nom=?, competences=?, disponibilite=?, statut=?, id_atelier=? WHERE id_artisan=?',
      [nom, competences, disponibilite, statut, id_atelier, req.params.id]
    );
    res.json({ message: 'Artisan modifié ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM artisan WHERE id_artisan = ?', [req.params.id]);
    res.json({ message: 'Artisan supprimé ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };