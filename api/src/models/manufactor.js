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
    info: DataTypes.STRING,
    ein: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }    
}, {
    timestamps: false
})

module.exports = Manufacturer;