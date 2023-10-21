const Category = require('../../src/models/category');

jest.mock('../../src/models/category', () => {
    return require('../../src/mocks/categoryMock');
});

describe('test categories', () => {

    // list of categories
    it('should return a list of categories', async() => {
        const result = await Category.findAll({
            limit: 20
        });

        const categories = result.map(c => c.dataValues);
        expect(categories.length).toBe(20);
        expect(categories[19]).toEqual({
            id: 20,
            name: 'category 20'
        })
    })

    // get a category
    it('should return a specific category', async () => {
        const result = await Category.findAll({
            where: {
                id: 1
            }
        });

        const categories = result.map(c => c.dataValues);

        expect(categories[0]).toEqual({
            id: 1,
            name: 'category 1'
        })
    })

    // create a category
    it('should create a category', async () => {

        const newCategory = {
            id: 4,
            name: 'Lamp'
        }

        const result = await Category.create(newCategory);

        expect(result.dataValues).toEqual(newCategory);
    })

    // delete a category
    it('should delete a category', async () => {
        const result = await Category.destroy({
            where: {
                id: 1
            }
        });

        expect(result).toBe(1);
    })
})