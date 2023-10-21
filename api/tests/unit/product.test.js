const Product = require('../../src/models/product');

jest.mock('../../src/models/product', () => {
    return require('../../src/mocks/productMock');
})

const productExample = {
    id: 1,
    title: 'product 1',
    description: 'description 1',
    manufacturerId: 1
}

describe('test products', () => {
    it('should create a product', async() => {
        const newProduct = productExample;

        const result = await Product.create(newProduct);

        expect(result.dataValues).toEqual(newProduct);
    })

    it('should get a list of products', async() => {
        const result = await Product.findAll({
            limit: 10
        });

        const products = result.map(p => p.dataValues);

        expect(products.length).toBe(10);

        expect(products[0]).toEqual(productExample);
    })

    it('should get a specific product', async() => {
        const result = await Product.findAll({
            where: {
                id: 1
            }
        });

        expect(result[0].dataValues).toEqual(productExample);
    })

    it('should delete product', async() => {
        const result = await Product.destroy({
            where: {
                id: 1
            }
        })

        expect(result).toBe(1);
    })
})