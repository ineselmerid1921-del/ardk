const router = require("express").Router();
const { addLigneSortie } = require("../controllers/ligneSortieController");

router.post("/", addLigneSortie);

module.exports = router;