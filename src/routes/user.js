const express = require('express');

const UserController = require('../controllers/userController');
const MiddlewareController = require('../controllers/middlewareController');

let userRouter = express.Router();

// Create
userRouter.post(
    '/users/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    UserController.addNewUser
);
userRouter.post(
    '/admins/add',
    MiddlewareController.verify_Token_Superadmin_Role,
    UserController.addNewUser
);
// Read
userRouter.get(
    '/users/:id',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    UserController.getUserById
);
userRouter.get(
    '/admins/:id',
    MiddlewareController.verify_Token_AdminId_Superadmin_Role,
    UserController.getUserById
);
userRouter.get(
    '/superadmins/:id',
    MiddlewareController.verify_Token_SuperadminId,
    UserController.getUserById
);
userRouter.get(
    '/users',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    UserController.getAllUser
);
userRouter.get(
    '/admins',
    MiddlewareController.verify_Token_Superadmin_Role,
    UserController.getAllAdmin
);
// Update
userRouter.put(
    '/users/edit/:id',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    UserController.updateUserById
);
userRouter.put(
    '/admins/edit/:id',
    MiddlewareController.verify_Token_AdminId_Superadmin_Role,
    UserController.updateUserById
);
userRouter.put(
    '/superadmins/edit/:id',
    MiddlewareController.verify_Token_SuperadminId,
    UserController.updateUserById
);
// Delete
userRouter.delete(
    '/users/delete/:id',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    UserController.deleteUserById
);
userRouter.delete(
    '/admins/delete/:id',
    MiddlewareController.verify_Token_AdminId_Superadmin_Role,
    UserController.deleteUserById
);
userRouter.delete(
    '/superadmins/delete/:id',
    MiddlewareController.verify_Token_SuperadminId,
    UserController.deleteUserById
);

module.exports = userRouter;
