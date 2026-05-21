const db = require('../config/db');

exports.createControle = async (req, res) => {
  const { resultat, commentaire, id_of, id_utilisateur } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO controle_qualite (resultat, commentaire, id_of, id_utilisateur) VALUES (?, ?, ?, ?)',
      [resultat, commentaire, id_of, id_utilisateur]
    );
    res.status(201).json({ message: 'Contrôle créé ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAllControles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM controle_qualite');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getControleById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM controle_qualite WHERE id_controle = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Introuvable' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateControle = async (req, res) => {
  const { resultat, commentaire } = req.body;
  try {
    await db.query(
      'UPDATE controle_qualite SET resultat=?, commentaire=? WHERE id_controle=?',
      [resultat, commentaire, req.params.id]
    );
    res.json({ message: 'Contrôle modifié ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteControle = async (req, res) => {
  try {
    await db.query('DELETE FROM controle_qualite WHERE id_controle=?', [req.params.id]);
    res.json({ message: 'Contrôle supprimé ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};