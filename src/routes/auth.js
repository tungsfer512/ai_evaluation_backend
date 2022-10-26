const express = require('express');

const AuthController = require('../controllers/authController');

let authRouter = express.Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
