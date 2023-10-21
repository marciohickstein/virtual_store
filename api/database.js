const { Sequelize } = require('sequelize');

const isTest = (process.env.JEST_ENV === 'true');

dbConfig = {
    host: isTest ? 'localhost' : 'db',
    port: '5432',
    database: isTest ? 'database_test' : 'database_development',
    user: 'seq',
    password: '123',
}

const database = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    logging: !isTest,
});

(async () => {
    try {
        await database.authenticate();
        if (!isTest)
            console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

module.exports = database;