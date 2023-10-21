const SequelizeMock = require('sequelize-mock');

const dbMock = new SequelizeMock();

const ProductMock = dbMock.define('product', {
    id: 1,
    title: 'product 1',
    description: 'description 1',
    manufacturerId: 1
}, {
    timestamps: false
});

ProductMock.$queryInterface.$useHandler((query, queryOptions, done) => {
    if (query === 'findAll') {
        const limit = queryOptions[0].limit ?? 10;
        const result = [];
        for (let x = 1; x <= limit; x++)
            result.push(ProductMock.build({ id: x, title: 'product ' + x, description: 'description ' + x, manufacturerId: x }));
        return result;
    }
})

module.exports = ProductMock;