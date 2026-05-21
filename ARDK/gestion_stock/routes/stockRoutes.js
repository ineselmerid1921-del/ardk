const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stockController");

router.get("/", stockController.getStock);
router.get("/:id", stockController.getStockById);
router.post("/", stockController.addStock);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

module.exports = router;