const express = require('express');

const DataController = require('../controllers/dataController');
const MiddlewareController = require('../controllers/middlewareController');

let dataRouter = express.Router();

// Create
dataRouter.post(
    '/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    DataController.addNewDataset
);
// Delete
dataRouter.delete(
    '/delete/:datasetId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    DataController.deleteDatasetById
);
// Update
dataRouter.post(
    '/samples/add',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    DataController.addNewSamples
);
dataRouter.delete(
    '/samples/delete/:sampleId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    DataController.deleteSampleById
);
// Read
dataRouter.get(
    '/problems/:problemId',
    MiddlewareController.verify_Token,
    DataController.getDatasetByProblemId
);
dataRouter.get('/minio', DataController.checkMinio);
dataRouter.get(
    '/:datasetId',
    MiddlewareController.verify_Token,
    DataController.getDatasetById
);
dataRouter.get(
    '/',
    MiddlewareController.verify_Token,
    DataController.getAllDataset
);

module.exports = dataRouter;
