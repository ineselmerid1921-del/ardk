const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM entree_stock ORDER BY date_entree DESC");
    res.json(rows);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM entree_stock WHERE id_entree=?", [req.params.id]);
    res.json(rows[0]);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.createEntree = async (req, res) => {
  try {
    const { type_entree, id_stock } = req.body;
    const [result] = await db.query(
      "INSERT INTO entree_stock (type_entree, id_stock) VALUES (?, ?)",
      [type_entree, id_stock]
    );
    res.status(201).json({ message: "Entrée créée ✅", id: result.insertId });
  } catch(err) { res.status(500).json({ error: err.message }); }
};

exports.deleteEntree = async (req, res) => {
  try {
    await db.query("DELETE FROM entree_stock WHERE id_entree=?", [req.params.id]);
    res.json({ message: "Entrée supprimée ✅" });
  } catch(err) { res.status(500).json({ error: err.message }); }
};
