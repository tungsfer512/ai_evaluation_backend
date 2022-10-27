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
    '/delete/:id',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.deleteGroupById
);
groupRouter.put(
    '/edit/:id',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.updateGroupById
);
groupRouter.post(
    '/:id/subgroups/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.addNewSubGroup
)
groupRouter.delete(
    '/:id/subgroups/delete/:subid',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.deleteSubGroupById
)
groupRouter.put(
    '/:id/subgroups/edit/:subid',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    GroupController.updateSubGroupByIdById
)
groupRouter.get(
    '/:id/subgroups/:subid',
    MiddlewareController.verify_Token,
    GroupController.getSubGroupById
)
groupRouter.get(
    '/:id/subgroups',
    MiddlewareController.verify_Token,
    GroupController.getAllSubGroupByGroupId
)
groupRouter.get(
    '/:id',
    MiddlewareController.verify_Token,
    GroupController.getGroupById
);
groupRouter.get(
    '/',
    MiddlewareController.verify_Token,
    GroupController.getAllGroup
);

module.exports = groupRouter;
