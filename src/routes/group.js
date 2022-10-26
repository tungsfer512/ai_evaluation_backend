const express = require('express');

const GroupController = require('../controllers/groupController');

let groupRouter = express.Router();

groupRouter.post('/add', GroupController.addNewGroup);
groupRouter.delete('/delete/:id', GroupController.deleteGroupById);
groupRouter.put('/edit/:id', GroupController.updateGroup);
groupRouter.get('/:id', GroupController.getGroupById);
groupRouter.get('/', GroupController.getAllGroup);

module.exports = groupRouter;
