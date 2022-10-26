const express = require('express');

const UserController = require('../controllers/userController');
const MiddlewareController = require('../controllers/middlewareController');

let userRouter = express.Router();

// Create
userRouter.post(
    '/add/user',
    MiddlewareController.verifyTokenUserIdAndSuperRole,
    UserController.addNewUser
);
userRouter.post(
    '/add/admin',
    MiddlewareController.verifyTokenAdminIdAndSuperRole,
    UserController.addNewAdmin
);
// Read
userRouter.get(
    '/user/:id',
    MiddlewareController.verifyTokenUserIdAndSuperRole,
    UserController.getUserById
);
userRouter.get(
    '/admin/:id',
    MiddlewareController.verifyTokenAdminIdAndSuperRole,
    UserController.getAdminById
);
userRouter.get(
    '/superadmin/:id',
    MiddlewareController.verifyTokenAndSuperadminID,
    UserController.getSuperadminById
);
userRouter.get(
    '/user',
    MiddlewareController.verifyTokenUserIdAndSuperRole,
    UserController.getAllUser
);
userRouter.get(
    '/admin',
    MiddlewareController.verifyTokenAdminIdAndSuperRole,
    UserController.getAllAdmin
);
// Update
userRouter.put(
    '/edit/user/:id',
    MiddlewareController.verifyTokenUserIdAndSuperRole,
    UserController.updateUser
);
userRouter.put(
    '/edit/admin/:id',
    MiddlewareController.verifyTokenAdminIdAndSuperRole,
    UserController.updateAdmin
);
userRouter.put(
    '/edit/superadmin/:id',
    MiddlewareController.verifyTokenAndSuperadminID,
    UserController.updateSuperadmin
);
// Delete
userRouter.delete(
    '/delete/user/:id',
    MiddlewareController.verifyTokenUserIdAndSuperRole,
    UserController.deleteUserById
);
userRouter.delete(
    '/delete/admin/:id',
    MiddlewareController.verifyTokenAdminIdAndSuperRole,
    UserController.deleteAdminById
);

module.exports = userRouter;
