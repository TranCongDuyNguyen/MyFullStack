const express = require('express');
const router = express.Router();

const controller = require('../../controllers/controller.users');

router.get('/', controller.fetchUsers);

router.post('/', controller.createUser);

// router.delete('/:id', controller.deleteUser);

module.exports = router;