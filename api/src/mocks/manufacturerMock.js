const SequelizeMock = require('sequelize-mock');

const sequelizeMock = new SequelizeMock();

const ManufacturerMock = sequelizeMock.define('manufacturer', {
    id: 1,
    name: 'manufacturer 1',
    info: 'company 1'
}, {
    timestamps: false
});

ManufacturerMock.$queryInterface.$useHandler((query, queryOptions, done) => {
    if (query === 'findAll') {

        const limit = queryOptions[0].limit ?? 10;
        const result = [];
        
        for (let x = 1; x <= limit; x++)
            result.push(ManufacturerMock.build({ id: x, name: 'manufacturer ' + x, info: 'company ' + x }));

        return result;
    }
})

module.exports = ManufacturerMock;