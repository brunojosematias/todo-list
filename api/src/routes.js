const { Router } = require('express');
const TaskController = require('./app/controllers/TaskController');

const routes = Router();

routes.get('/tasks', TaskController.index);
routes.get('/ischecked', TaskController.indexChecked);
routes.post('/tasks', TaskController.store);
routes.put('/tasks/:id', TaskController.storeCheck);
routes.delete('/tasks/:id', TaskController.delete);

module.exports = routes;
