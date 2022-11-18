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
dataRouter.put(
    '/edit/:datasetId',
    MiddlewareController.verify_Token_Admin_Superadmin_Role,
    DataController.updateDatasetById
);
// Read
// dataRouter.get(
//     '/groups/subgroups/:subGroupId',
//     MiddlewareController.verify_Token,
//     DataController.getAllDatasetBySubGroupId
// );
// dataRouter.get(
//     '/groups/:groupId',
//     MiddlewareController.verify_Token,
//     DataController.getAllDatasetByGroupId
// );
dataRouter.get(
    '/problems/:problemId',
    MiddlewareController.verify_Token,
    DataController.getAllDatasetByProblemId
);
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
