const db = require("../config/db");

exports.getStock = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ls.*, a.nom as article_nom, a.unite_mesure, s.seuil_alerte, s.id_atelier
      FROM ligne_stock ls
      JOIN article a ON ls.id_article = a.id_article
      JOIN stock s ON ls.id_stock = s.id_stock
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getStockById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM stock WHERE id_stock = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Stock not found" });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addStock = async (req, res) => {
  try {
    const { seuil_alerte, id_atelier } = req.body;
    const [result] = await db.query(
      "INSERT INTO stock (seuil_alerte, date_maj, id_atelier) VALUES (?, NOW(), ?)",
      [seuil_alerte, id_atelier]
    );
    res.json({ message: "Stock ajouté ✅", id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateStock = async (req, res) => {
  try {
    const { seuil_alerte, id_atelier } = req.body;
    await db.query(
      "UPDATE stock SET seuil_alerte=?, id_atelier=?, date_maj=NOW() WHERE id_stock=?",
      [seuil_alerte, id_atelier, req.params.id]
    );
    res.json({ message: "Stock modifié ✅" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteStock = async (req, res) => {
  try {
    await db.query("DELETE FROM stock WHERE id_stock=?", [req.params.id]);
    res.json({ message: "Stock supprimé ✅" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
