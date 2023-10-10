const database = require('../../database');
const { DataTypes } = require('sequelize');
const Category = require('./category');
const Product = require('./product');

const ProductCategory = database.define('productCategory', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

// (async () => {
//     const productCategory = await ProductCategory.findAll({
//         include: {
//             model: Category
//         },
//     });

//     console.log(productCategory[0].dataValues.category)
// })()
module.exports = ProductCategory;