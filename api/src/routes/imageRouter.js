const imageRouter = require('express').Router();
const Image = require('../models/image');
const createController = require('../controllers/basicController');
const imageController = require('../controllers/imageController');
const controller = createController(Image);

imageRouter.get('/', controller.getAll);
imageRouter.get('/:id', controller.getOne);
imageRouter.post('/', controller.create);
imageRouter.delete('/:id', controller.delete);
imageRouter.get('/data/:id', imageController.getImage);

module.exports = imageRouter;