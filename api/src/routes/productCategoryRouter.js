const productCategoryRouter = require('express').Router();
const ProductCategory = require('../models/productCategory');
const createController = require('../controllers/basicController');
const Category = require('../models/category');
const Product = require('../models/product');

const controller = createController(ProductCategory, {
    include: [
      {
        model: Category, // The associated model to include
      },
    ]
});

productCategoryRouter.get('/', controller.getAll);
productCategoryRouter.get('/:id', controller.getOne);
productCategoryRouter.post('/', controller.create);
productCategoryRouter.delete('/:id', controller.delete);

module.exports = productCategoryRouter;