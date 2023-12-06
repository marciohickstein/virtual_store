const { Sequelize } = require('sequelize');
const Category = require('./category');
const Image = require('./image');
const ProductCategory = require('./productCategory');

const database = require('../../database');

const Manufacturer = require('./manufactor');

const Product = database.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        unique: true
    },
    description: Sequelize.STRING,
    price: Sequelize.DECIMAL,
},{
    timestamps: false
})

// 1 - 1
Product.belongsTo(Manufacturer, {
    constraints: true,
    foreignKey: "manufacturerId"
})

// 1 - N 
Manufacturer.hasMany(Product, {
    foreignKey: 'manufacturerId'
})

Product.hasMany(Image, {
    foreignKey: 'productId'
});

// N - M
Product.belongsToMany(Category, {
    through: {
        model: ProductCategory
    },
    constraints: true,
    foreignKey: 'productId'
})

Category.belongsToMany(Product, {
    through: {
        model: ProductCategory
    },
    constraints: true,
    foreignKey: 'categoryId'
})

// Super Many To Many Relationship
Product.hasMany(ProductCategory, { foreignKey: 'productId'});
ProductCategory.belongsTo(ProductCategory, { foreignKey: 'productId'});

Category.hasMany(ProductCategory, { foreignKey: 'categoryId'});
ProductCategory.belongsTo(Category, { foreignKey: 'categoryId'});

module.exports = Product;