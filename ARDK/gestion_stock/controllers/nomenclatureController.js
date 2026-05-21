const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM nomenclature');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM nomenclature WHERE id_nomenclature = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Introuvable' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  const { version, date_creation, statut, description, id_article } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO nomenclature (version, date_creation, statut, description, id_article) VALUES (?, ?, ?, ?, ?)',
      [version, date_creation, statut || 'BROUILLON', description, id_article]
    );
    res.status(201).json({ message: 'Nomenclature ajoutée ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  const { version, date_creation, statut, description, id_article } = req.body;
  try {
    await db.query(
      'UPDATE nomenclature SET version=?, date_creation=?, statut=?, description=?, id_article=? WHERE id_nomenclature=?',
      [version, date_creation, statut, description, id_article, req.params.id]
    );
    res.json({ message: 'Nomenclature modifiée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM nomenclature WHERE id_nomenclature=?', [req.params.id]);
    res.json({ message: 'Nomenclature supprimée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};