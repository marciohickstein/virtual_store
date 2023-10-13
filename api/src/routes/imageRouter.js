const imageRouter = require('express').Router();
const Image = require('../models/image');
const createController = require('../controllers/basicController');

const controller = createController(Image);

imageRouter.get('/', controller.getAll);
imageRouter.get('/:id', controller.getOne);
imageRouter.post('/', controller.create);
imageRouter.delete('/:id', controller.delete);

module.exports = imageRouter;