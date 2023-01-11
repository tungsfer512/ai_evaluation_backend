const express = require('express');

const HubController = require('../controllers/hubController');
const MiddlewareController = require('../controllers/middlewareController');

const hubRouter = express.Router();

hubRouter.post(
    '/find',
    MiddlewareController.verify_Token,
    HubController.findAvailableHub
);

hubRouter.post(
    '/evaluate',
    MiddlewareController.verify_Token,
    HubController.evaluate
);
hubRouter.post(
    '/test',
    MiddlewareController.verify_Token,
    HubController.test
);

module.exports = hubRouter;
