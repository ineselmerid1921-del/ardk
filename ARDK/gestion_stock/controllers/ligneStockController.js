const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ls.*, a.nom as article_nom, a.unite_mesure
      FROM ligne_stock ls
      JOIN article a ON ls.id_article = a.id_article
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ligne_stock WHERE id_ligne_stock=?", [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { quantite_disponible, quantite_reservee, emplacement, id_stock, id_article } = req.body;
    const [result] = await db.query(
      "INSERT INTO ligne_stock (quantite_disponible, quantite_reservee, emplacement, id_stock, id_article) VALUES (?,?,?,?,?)",
      [quantite_disponible||0, quantite_reservee||0, emplacement, id_stock, id_article]
    );
    res.status(201).json({ message: "Ligne stock ajoutée ✅", id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const { quantite_disponible, quantite_reservee, emplacement } = req.body;
    await db.query(
      "UPDATE ligne_stock SET quantite_disponible=?, quantite_reservee=?, emplacement=? WHERE id_ligne_stock=?",
      [quantite_disponible, quantite_reservee, emplacement, req.params.id]
    );
    res.json({ message: "Ligne stock modifiée ✅" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await db.query("DELETE FROM ligne_stock WHERE id_ligne_stock=?", [req.params.id]);
    res.json({ message: "Ligne stock supprimée ✅" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
