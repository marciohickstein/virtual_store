const { Sequelize } = require('sequelize');
const database = require('../../database');
const Product = require('./product');

const Image = database.define('image', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),
    data: Sequelize.BLOB,
},
{
    timestamps: false
});

Image.hasMany(Product, {
    foreignKey: 'productId'
});

(async () => {
    const images = await Image.findAll();

    console.log(images);
})()
module.exports = Image;