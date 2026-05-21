                                                                                                                                          const express = require('express');
const router = express.Router();

const controller = require('../controllers/declarationdeproductionController');

router.post('/', controller.createDeclaration);
router.get('/', controller.getAllDeclarations);
router.get('/:id', controller.getDeclarationById);
router.put('/:id', controller.updateDeclaration);
router.delete('/:id', controller.deleteDeclaration);

module.exports = router;