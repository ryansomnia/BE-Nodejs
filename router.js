// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('./controller/user');
const { authenticateToken } = require('./middleware/auth');

router.post('/user/login', userController.login);
router.get('/user/getAllUsers',authenticateToken, userController.getAllUsers);

module.exports = router;
