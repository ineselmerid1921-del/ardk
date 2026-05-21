const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ln.*, a.nom as article_nom FROM ligne_nomenclature ln
      JOIN article a ON ln.id_article_composant = a.id_article
    `);
    res.json(rows);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ligne_nomenclature WHERE id_ligne_nomenclature=?", [req.params.id]);
    res.json(rows[0]);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { quantite_requise, unite_mesure, niveau_assemblage, id_nomenclature, id_article_composant } = req.body;
    const [result] = await db.query(
      "INSERT INTO ligne_nomenclature (quantite_requise, unite_mesure, niveau_assemblage, id_nomenclature, id_article_composant) VALUES (?,?,?,?,?)",
      [quantite_requise, unite_mesure, niveau_assemblage, id_nomenclature, id_article_composant]
    );
    res.status(201).json({ message: "Ligne nomenclature créée ✅", id: result.insertId });
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const { quantite_requise, unite_mesure, niveau_assemblage } = req.body;
    await db.query(
      "UPDATE ligne_nomenclature SET quantite_requise=?, unite_mesure=?, niveau_assemblage=? WHERE id_ligne_nomenclature=?",
      [quantite_requise, unite_mesure, niveau_assemblage, req.params.id]
    );
    res.json({ message: "Ligne nomenclature modifiée ✅" });
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await db.query("DELETE FROM ligne_nomenclature WHERE id_ligne_nomenclature=?", [req.params.id]);
    res.json({ message: "Ligne nomenclature supprimée ✅" });
  } catch(err) { res.status(500).json({ error: err.message }); }
};
