const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gamme_fabrication');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gamme_fabrication WHERE id_gamme = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Introuvable' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  const { version, description, duree_totale_estimee, id_article } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO gamme_fabrication (version, description, duree_totale_estimee, id_article) VALUES (?, ?, ?, ?)',
      [version, description, duree_totale_estimee, id_article]
    );
    res.status(201).json({ message: 'Gamme ajoutée ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  const { version, description, duree_totale_estimee, id_article } = req.body;
  try {
    await db.query(
      'UPDATE gamme_fabrication SET version=?, description=?, duree_totale_estimee=?, id_article=? WHERE id_gamme=?',
      [version, description, duree_totale_estimee, id_article, req.params.id]
    );
    res.json({ message: 'Gamme modifiée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM gamme_fabrication WHERE id_gamme=?', [req.params.id]);
    res.json({ message: 'Gamme supprimée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};