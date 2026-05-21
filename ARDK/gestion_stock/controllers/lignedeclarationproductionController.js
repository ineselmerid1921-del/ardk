const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ligne_declaration_production");
    res.json(rows);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ligne_declaration_production WHERE id_ligne_declaration=?", [req.params.id]);
    res.json(rows[0]);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { quantite_produite, quantite_defectueuse, id_declaration, id_article } = req.body;
    const [result] = await db.query(
      "INSERT INTO ligne_declaration_production (quantite_produite, quantite_defectueuse, id_declaration, id_article) VALUES (?,?,?,?)",
      [quantite_produite, quantite_defectueuse, id_declaration, id_article]
    );
    res.status(201).json({ message: "Ligne déclaration créée ✅", id: result.insertId });
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const { quantite_produite, quantite_defectueuse } = req.body;
    await db.query(
      "UPDATE ligne_declaration_production SET quantite_produite=?, quantite_defectueuse=? WHERE id_ligne_declaration=?",
      [quantite_produite, quantite_defectueuse, req.params.id]
    );
    res.json({ message: "Ligne déclaration modifiée ✅" });
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await db.query("DELETE FROM ligne_declaration_production WHERE id_ligne_declaration=?", [req.params.id]);
    res.json({ message: "Ligne déclaration supprimée ✅" });
  } catch(err) { res.status(500).json({ error: err.message }); }
};
