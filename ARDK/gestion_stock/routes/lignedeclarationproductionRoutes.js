                                                                                                                               const express = require('express');
const router = express.Router();

const controller = require('../controllers/lignedeclarationproductionController'); // ⚠️ IMPORTANT

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;