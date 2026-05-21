const express = require('express');
const router = express.Router();

const {
  getAll,
  getById,
  create,
  update,
  remove,
  accepter,
  refuser
} = require('../controllers/atelier.controller');

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', remove);

router.put('/:id/accepter', accepter);

router.put('/:id/refuser', refuser);

module.exports = router;