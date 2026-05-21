const router = require("express").Router();
const db = require("../config/db");
const { createEntree } = require("../controllers/entreeController");

router.post("/", createEntree);

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM entree_stock");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM entree_stock WHERE id_entree=?", [req.params.id]);
    res.json({ message: "Entrée supprimée ✅" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;