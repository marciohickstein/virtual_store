const database = require('./database');
const Product = require('./src/models/product');
const Manufacturer = require('./src/models/manufactor');
const Category = require('./src/models/category');
const ProductCategory = require('./src/models/productCategory');

(async () => {

    const manufacturers = (await Manufacturer.findAll()).map(m => m.dataValues);
    const categories = (await Category.findAll()).map(c => c.dataValues);
    const products = (await Product.findAll({ include: [
        {
          model: Manufacturer,
          as: 'manufacturer', // Alias for the Manufacturer model
        },
        {
          model: Category,
          as: 'categories', // Alias for the Category model (plural because it's a many-to-many relationship)
          through: 'ProductCategory', // Replace with your actual through table name
        },
      ],})).map(p => {
        const product = {
            ...p.dataValues,
            ...p.manufacturer.dataValues
        }

        console.log(p.categories[0].dataValues)
        delete product.manufacturer;

        return product;
    });

    console.table(manufacturers);
    console.table(categories);
    console.table(products);



})()
