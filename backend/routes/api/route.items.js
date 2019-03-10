const express = require('express');
const router = express.Router();

const controller = require('../../controllers/controller.item');

router.get('/', controller.fetchItems);

router.post('/', controller.createItem);

router.delete('/:id', controller.deleteItem);

module.exports = router;