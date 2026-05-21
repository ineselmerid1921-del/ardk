const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM article");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM article WHERE id_article = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Article introuvable" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nom, type, description, unite_mesure } = req.body;
    const [result] = await db.query(
      "INSERT INTO article (nom, type, description, unite_mesure) VALUES (?, ?, ?, ?)",
      [nom, type, description, unite_mesure]
    );
    res.status(201).json({ message: "Article ajouté ✅", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nom, type, description, unite_mesure } = req.body;
    await db.query(
      "UPDATE article SET nom=?, type=?, description=?, unite_mesure=? WHERE id_article=?",
      [nom, type, description, unite_mesure, req.params.id]
    );
    res.json({ message: "Article modifié ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM article WHERE id_article=?",
      [req.params.id]
    );
    res.json({ message: "Article supprimé ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};