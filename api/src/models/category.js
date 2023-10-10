const database = require('../../database');
const { DataTypes } = require('sequelize');

const Category = database.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
}, {
    timestamps: false
})

module.exports = Category;