const express = require('express');

const DataController = require('../controllers/dataController');

let groupRouter = express.Router();

groupRouter.post('/add', DataController.addNewData);
groupRouter.delete('/delete/:id', DataController.deleteDataById);
groupRouter.put('/edit/:id', DataController.updateData);
groupRouter.get('/:id', DataController.getDataById);
groupRouter.get('/', DataController.getAllData);

module.exports = groupRouter;
