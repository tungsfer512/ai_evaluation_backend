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
    UserController.addNewAdmin
);
// Update
userRouter.put(
    '/users/edit/:userId',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    UserController.updateUserById
);
userRouter.put(
    '/admins/edit/:userId',
    MiddlewareController.verify_Token_AdminId_Superadmin_Role,
    UserController.updateAdminById
);
userRouter.put(
    '/superadmins/edit/:userId',
    MiddlewareController.verify_Token_SuperadminId,
    UserController.updatesuperadminById
);
// Delete
userRouter.delete(
    '/users/delete/:userId',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    UserController.deleteUserById
);
userRouter.delete(
    '/admins/delete/:userId',
    MiddlewareController.verify_Token_AdminId_Superadmin_Role,
    UserController.deleteAdminById
);
// Read
userRouter.get(
    '/users/:userId',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    UserController.getUserById
);
userRouter.get(
    '/admins/:userId',
    MiddlewareController.verify_Token_AdminId_Superadmin_Role,
    UserController.getAdminById
);
userRouter.get(
    '/superadmins/:userId',
    MiddlewareController.verify_Token_SuperadminId,
    UserController.getSuperadminById
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

module.exports = userRouter;
