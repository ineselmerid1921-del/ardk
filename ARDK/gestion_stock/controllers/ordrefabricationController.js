const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ordre_fabrication');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ordre_fabrication WHERE id_of = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Introuvable' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  const { date_creation, date_lancement, quantite_a_produire, statut, id_article, id_gamme, id_nomenclature, id_atelier } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO ordre_fabrication (date_creation, date_lancement, quantite_a_produire, statut, id_article, id_gamme, id_nomenclature, id_atelier)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [date_creation, date_lancement, quantite_a_produire, statut || 'PLANIFIE', id_article, id_gamme, id_nomenclature, id_atelier]
    );
    res.status(201).json({ message: 'Ordre créé ✅', id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  const { date_creation, date_lancement, quantite_a_produire, statut, id_article, id_gamme, id_nomenclature, id_atelier } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE ordre_fabrication SET date_creation=?, date_lancement=?, quantite_a_produire=?, statut=?, id_article=?, id_gamme=?, id_nomenclature=?, id_atelier=? WHERE id_of=?`,
      [date_creation, date_lancement, quantite_a_produire, statut, id_article, id_gamme, id_nomenclature, id_atelier, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Introuvable' });
    res.json({ message: 'Ordre modifié ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM ordre_fabrication WHERE id_of=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Introuvable' });
    res.json({ message: 'Ordre supprimé ✅' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};