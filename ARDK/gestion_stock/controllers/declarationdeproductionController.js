const db = require('../config/db');

exports.createDeclaration = async (req, res) => {
  const { commentaire, id_of, id_utilisateur } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO declaration_production (commentaire, id_of, id_utilisateur) VALUES (?, ?, ?)',
      [commentaire, id_of, id_utilisateur]
    );
    res.status(201).json({ message: 'Déclaration créée ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAllDeclarations = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM declaration_production');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getDeclarationById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM declaration_production WHERE id_declaration = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Introuvable' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateDeclaration = async (req, res) => {
  const { commentaire, id_of, id_utilisateur } = req.body;
  try {
    await db.query(
      'UPDATE declaration_production SET commentaire=?, id_of=?, id_utilisateur=? WHERE id_declaration=?',
      [commentaire, id_of, id_utilisateur, req.params.id]
    );
    res.json({ message: 'Déclaration modifiée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteDeclaration = async (req, res) => {
  try {
    await db.query('DELETE FROM declaration_production WHERE id_declaration=?', [req.params.id]);
    res.json({ message: 'Déclaration supprimée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};