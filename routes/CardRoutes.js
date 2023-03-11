const express = require('express');
const router = express.Router();
const auth = require('./../middlware/middlware')

const cardController = require('./../controller/CardController');

//get all cards
router.get("/", auth, cardController.getAll);
router.post('/', auth, cardController.create);
router.put('/', auth, cardController.update);
router.delete('/:id', auth, cardController.delete);

module.exports = router;