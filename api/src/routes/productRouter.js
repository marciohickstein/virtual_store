const productRouter = require('express').Router();
const Product = require('../models/product');
const createController = require('../controllers/basicController');
const Manufacturer = require('../models/manufactor');

const controller = createController(Product, {
    include: {
      model: Manufacturer, // The associated model to include
    }
  }, [ 'title'] );

productRouter.get('/', controller.getAll);
productRouter.get('/:id', controller.getOne);
productRouter.post('/', controller.create);
productRouter.delete('/:id', controller.delete);

module.exports = productRouter;