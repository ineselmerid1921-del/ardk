const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM poste_travail');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM poste_travail WHERE id_poste = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { nom, type_machine, capacite_horaire, statut, id_atelier } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO poste_travail (nom, type_machine, capacite_horaire, statut, id_atelier) VALUES (?, ?, ?, ?, ?)',
      [nom, type_machine, capacite_horaire, statut || 'DISPONIBLE', id_atelier]
    );
    res.status(201).json({ message: 'Poste ajouté ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { nom, type_machine, capacite_horaire, statut, id_atelier } = req.body;
  try {
    await pool.query(
      'UPDATE poste_travail SET nom=?, type_machine=?, capacite_horaire=?, statut=?, id_atelier=? WHERE id_poste=?',
      [nom, type_machine, capacite_horaire, statut, id_atelier, req.params.id]
    );
    res.json({ message: 'Poste modifié ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM poste_travail WHERE id_poste = ?', [req.params.id]);
    res.json({ message: 'Poste supprimé ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };