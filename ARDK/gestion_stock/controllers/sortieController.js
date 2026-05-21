const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sortie_stock ORDER BY date_sortie DESC");
    res.json(rows);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sortie_stock WHERE id_sortie=?", [req.params.id]);
    res.json(rows[0]);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.createSortie = async (req, res) => {
  try {
    const { type_sortie, id_stock } = req.body;
    const [result] = await db.query(
      "INSERT INTO sortie_stock (type_sortie, id_stock) VALUES (?, ?)",
      [type_sortie, id_stock]
    );
    res.status(201).json({ message: "Sortie créée ✅", id: result.insertId });
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.deleteSortie = async (req, res) => {
  try {
    await db.query("DELETE FROM sortie_stock WHERE id_sortie=?", [req.params.id]);
    res.json({ message: "Sortie supprimée ✅" });
  } catch(err) { res.status(500).json({ error: err.message }); }
};
