const router = require("express").Router();
const db = require("../config/db");
const { createSortie } = require("../controllers/sortieController");

router.post("/", createSortie);

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sortie_stock");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM sortie_stock WHERE id_sortie=?", [req.params.id]);
    res.json({ message: "Sortie supprimée ✅" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;