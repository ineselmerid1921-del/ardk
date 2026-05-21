const express = require('express');
const router = express.Router();

const {
  getAll,
  getById,
  create,
  update,
  remove,
  login
} = require('../controllers/utilisateur.controller');

// ✅ login لازم يكون قبل /:id
router.post('/login', login);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;