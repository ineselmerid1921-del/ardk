const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM operation');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM operation WHERE id_operation = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Introuvable' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  const { nom, description, duree_estimee, ordre_execution, statut, id_gamme, id_poste } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO operation (nom, description, duree_estimee, ordre_execution, statut, id_gamme, id_poste) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nom, description, duree_estimee, ordre_execution, statut || 'PREVUE', id_gamme, id_poste]
    );
    res.status(201).json({ message: 'Opération ajoutée ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  const { nom, description, duree_estimee, ordre_execution, statut, id_gamme, id_poste } = req.body;
  try {
    await db.query(
      'UPDATE operation SET nom=?, description=?, duree_estimee=?, ordre_execution=?, statut=?, id_gamme=?, id_poste=? WHERE id_operation=?',
      [nom, description, duree_estimee, ordre_execution, statut, id_gamme, id_poste, req.params.id]
    );
    res.json({ message: 'Opération modifiée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM operation WHERE id_operation=?', [req.params.id]);
    res.json({ message: 'Opération supprimée ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};