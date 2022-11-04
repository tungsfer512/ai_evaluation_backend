const express = require('express');

const HubController = require('../controllers/hubController');
const MiddlewareController = require('../controllers/middlewareController');

const hubRouter = express.Router();

hubRouter.get(
    '/find',
    MiddlewareController.verify_Token,
    HubController.findAvailableHub
);

hubRouter.get(
    '/token',
    MiddlewareController.verify_Token,
    HubController.getNewHubInfo
);

module.exports = hubRouter;
