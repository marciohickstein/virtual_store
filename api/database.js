const { Sequelize } = require('sequelize');

const database = new Sequelize('database_development', 'seq', '123', {
    dialect: 'postgres',
    host: 'db',
});

(async () => {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

module.exports = database;