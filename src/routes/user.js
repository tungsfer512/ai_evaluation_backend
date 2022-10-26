const express = require('express');

const UserController = require('../controllers/userController');
const MiddlewareController = require("../controllers/middlewareController");

let userRouter = express.Router();

userRouter.post('/add', MiddlewareController.verifyTokenAndRoleAdmin, UserController.addNewUser);
userRouter.delete('/delete/:id', UserController.deleteUserById);
userRouter.put('/edit/:id', UserController.updateUser);
userRouter.get('/:id', UserController.getUserById);
userRouter.get('/', UserController.getAllUser);

module.exports = userRouter;
