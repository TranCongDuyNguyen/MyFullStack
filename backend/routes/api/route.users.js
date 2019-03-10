const express = require('express');
const router = express.Router();

const controller = require('../../controllers/controller.users');

router.get('/', controller.fetchUsers);

module.exports = router;