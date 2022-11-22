const express = require('express');

const HubController = require('../controllers/hubController');
const MiddlewareController = require('../controllers/middlewareController');

const hubRouter = express.Router();

hubRouter.get(
    '/find',
    MiddlewareController.verify_Token,
    HubController.findAvailableHub
);

hubRouter.post(
    '/evaluate',
    MiddlewareController.verify_Token,
    HubController.evaluate
);

module.exports = hubRouter;
