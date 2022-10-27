const express = require('express');

const GroupController = require('../controllers/groupController');
const MiddlewareController = require('../controllers/middlewareController');

let groupRouter = express.Router();

groupRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.addNewGroup
);
groupRouter.delete(
    '/delete/:groupId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.deleteGroupById
);
groupRouter.put(
    '/edit/:groupId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.updateGroupById
);
groupRouter.post(
    '/:groupId/subgroups/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.addNewSubGroup
);
groupRouter.delete(
    '/:groupId/subgroups/delete/:subGroupId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.deleteSubGroupById
);
groupRouter.put(
    '/:groupId/subgroups/edit/:subGroupId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.updateSubGroupById
);
groupRouter.get(
    '/:groupId/subgroups/:subGroupId',
    MiddlewareController.verify_Token,
    GroupController.getSubGroupById
);
groupRouter.get(
    '/:groupId/subgroups',
    MiddlewareController.verify_Token,
    GroupController.getAllSubGroupByGroupId
);
groupRouter.get(
    '/:groupId',
    MiddlewareController.verify_Token,
    GroupController.getGroupById
);
groupRouter.get(
    '/',
    MiddlewareController.verify_Token,
    GroupController.getAllGroup
);

module.exports = groupRouter;
