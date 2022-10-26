const express = require('express');

const ProblemController = require('../controllers/problemController');

let problemRouter = express.Router();

problemRouter.post('/add', ProblemController.addNewProblem);
problemRouter.delete('/delete/:id', ProblemController.deleteProblemById);
problemRouter.put('/edit/:id', ProblemController.updateProblem);
problemRouter.get('/:id', ProblemController.getProblemById);
problemRouter.get('/', ProblemController.getAllProblem);

module.exports = problemRouter;
