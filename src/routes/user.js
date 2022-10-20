const express = require('express');

const UserController = require('../controllers/userController');

let userRouter = express.Router();

userRouter.post('/add', UserController.addNewUser);
userRouter.delete('/delete/:id', UserController.deleteUserById);
userRouter.put('/edit/:id', UserController.updateUser);
userRouter.get('/:id', UserController.getUserById);
userRouter.get('/', UserController.getAllUser);

module.exports = userRouter;