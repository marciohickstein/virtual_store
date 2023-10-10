//const categoryController = require('../controllers/categoryController');
const createController = require('../controllers/basicController');
const Category = require('../models/category');
const categoryRouter = require('express').Router();

const controller = createController(Category);

categoryRouter.get('/', controller.getAll);
categoryRouter.get('/:id', controller.getOne);
categoryRouter.post('/', controller.create);
categoryRouter.delete('/:id', controller.delete);

module.exports = categoryRouter;