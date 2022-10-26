const express = require('express');

const DataController = require('../controllers/dataController');

let dataRouter = express.Router();

dataRouter.post('/add', DataController.addNewData);
dataRouter.delete('/delete/:id', DataController.deleteDataById);
dataRouter.put('/edit/:id', DataController.updateData);
dataRouter.get('/:id', DataController.getDataById);
dataRouter.get('/', DataController.getAllData);

module.exports = dataRouter;
