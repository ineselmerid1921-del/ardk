                                                                                                                                                    const express = require('express');
const router = express.Router();
const controller = require('../controllers/controlequaliteController');

router.post('/', controller.createControle);
router.get('/', controller.getAllControles);
router.get('/:id', controller.getControleById);
router.put('/:id', controller.updateControle);
router.delete('/:id', controller.deleteControle);

module.exports = router;