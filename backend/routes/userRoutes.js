const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.get('/user/:id', userController.getUserInfo);
router.put('/user/:id', userController.updateUserInfo);

module.exports = router;
