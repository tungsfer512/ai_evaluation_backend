const express = require('express');

const SubmissionController = require('../controllers/submissionController');

let problemRouter = express.Router();

problemRouter.post('/add', SubmissionController.addNewSubmission);
problemRouter.delete('/delete/:id', SubmissionController.deleteSubmissionById);
problemRouter.put('/edit/:id', SubmissionController.updateSubmission);
problemRouter.get('/:id', SubmissionController.getSubmissionById);
problemRouter.get('/', SubmissionController.getAllSubmission);

module.exports = problemRouter;
