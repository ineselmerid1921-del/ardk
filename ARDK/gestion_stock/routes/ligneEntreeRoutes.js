const router = require("express").Router();
const { addLigneEntree } = require("../controllers/ligneEntreeController");

router.post("/", addLigneEntree);

module.exports = router;