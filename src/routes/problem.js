const express = require('express');

const ProblemController = require('../controllers/problemController');
const MiddlewareController = require('../controllers/middlewareController');

let problemRouter = express.Router();

// Create
problemRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    ProblemController.addNewProblem
);
// Delete
problemRouter.delete(
    '/delete/:problemId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    ProblemController.deleteProblemById
);
// Update
problemRouter.put(
    '/edit/:problemId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    ProblemController.updateProblemById
);
// Read
problemRouter.get(
    '/groups/subgroups/:subGroupId',
    MiddlewareController.verify_Token,
    ProblemController.getAllProblemBySubGroupId
);
problemRouter.get(
    '/free',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    ProblemController.getAllFreeProblem
);
problemRouter.get(
    '/:problemId',
    MiddlewareController.verify_Token,
    ProblemController.getProblemById
);
problemRouter.get(
    '/',
    MiddlewareController.verify_Token,
    ProblemController.getAllProblem
);

module.exports = problemRouter;
