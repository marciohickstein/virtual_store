const { DataTypes } = require('sequelize');

const database = require('../../database');

const Manufacturer = database.define('manufacturer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    info: DataTypes.STRING
}, {
    timestamps: false
})

module.exports = Manufacturer;