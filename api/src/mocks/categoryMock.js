const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const CategoryMock = dbMock.define('categories', {
    id: 1,
    name: 'category 1'
}, {
    timestamps: false
})

CategoryMock.$queryInterface.$useHandler((query, queryOptions, done) => {
    if (query === 'findAll') {
        const limit = queryOptions[0].limit ?? 10;
        const result = [];
        for (let x = 1; x <= limit; x++)
            result.push(CategoryMock.build({ id: x, name: 'category ' + x }));
        return result;
    }
})

module.exports = CategoryMock;