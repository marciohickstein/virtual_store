const { Sequelize } = require('sequelize');

let host = process.env.JEST_ENV === 'true' ? 'localhost' : 'db';
let log =  process.env.JEST_ENV !== 'true';

const database = new Sequelize('database_development', 'seq', '123', {
    dialect: 'postgres',
    host: host,
    logging: log,
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