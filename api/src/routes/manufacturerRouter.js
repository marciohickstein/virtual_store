const manufacturerRouter = require('express').Router();
const Manufacturer = require('../models/manufactor');
const createController = require('../controllers/basicController');

const controller = createController(Manufacturer);

manufacturerRouter.get('/', controller.getAll);
manufacturerRouter.get('/:id', controller.getOne);
manufacturerRouter.post('/', controller.create);
manufacturerRouter.delete('/:id', controller.delete);

module.exports = manufacturerRouter;