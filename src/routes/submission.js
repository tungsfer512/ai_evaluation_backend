const express = require('express');

const SubmissionController = require('../controllers/submissionController');
const MiddlewareController = require('../controllers/middlewareController');

let submissionRouter = express.Router();

// Create
submissionRouter.post(
    '/add',
    MiddlewareController.verify_Token,
    SubmissionController.addNewSubmission
);
// Delete
submissionRouter.delete(
    '/delete/:submissionId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    SubmissionController.deleteSubmissionById
);
// Update
submissionRouter.put(
    '/edit/:submissionId',
    MiddlewareController.verify_Token,
    SubmissionController.updateSubmissionById
);
// Read
submissionRouter.get(
    '/groups/subgroups/:subGroupId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    SubmissionController.getAllSubmissionBySubGroupId
);
submissionRouter.get(
    '/groups/:groupId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    SubmissionController.getAllSubmissionByGroupId
);
submissionRouter.get(
    '/problems/:problemId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    SubmissionController.getAllSubmissionByProblemId
);
submissionRouter.get(
    '/problems/:problemId/users/:userId',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    SubmissionController.getAllSubmissionByUserIdAndProblemId
);
submissionRouter.get(
    '/users/:userId',
    MiddlewareController.verify_Token_UserId_Admin_Superadmin_Role,
    SubmissionController.getAllSubmissionByUserId
);
submissionRouter.get(
    '/:submissionId',
    MiddlewareController.verify_Token,
    SubmissionController.getSubmissionById
);
submissionRouter.get(
    '/',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    SubmissionController.getAllSubmission
);

module.exports = submissionRouter;
