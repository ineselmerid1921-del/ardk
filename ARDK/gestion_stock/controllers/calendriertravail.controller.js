const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM calendrier_travail');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM calendrier_travail WHERE id_calendrier = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
  const { horaires, jours_travail, exceptions, id_artisan } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO calendrier_travail (horaires, jours_travail, exceptions, id_artisan) VALUES (?, ?, ?, ?)',
      [horaires, jours_travail, exceptions, id_artisan]
    );
    res.status(201).json({ message: 'Calendrier ajouté ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
  const { horaires, jours_travail, exceptions, id_artisan } = req.body;
  try {
    await pool.query(
      'UPDATE calendrier_travail SET horaires=?, jours_travail=?, exceptions=?, id_artisan=? WHERE id_calendrier=?',
      [horaires, jours_travail, exceptions, id_artisan, req.params.id]
    );
    res.json({ message: 'Calendrier modifié ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM calendrier_travail WHERE id_calendrier = ?', [req.params.id]);
    res.json({ message: 'Calendrier supprimé ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove };