const Manufacturer = require('../../src/models/manufactor');

jest.mock('../../src/models/manufactor', () => {
    return require('../../src/mocks/manufacturerMock')
})

describe('test manufacturers', () => {
    it('should create a manufacturer', async () => {
        const newManufacturer = {
            id: 4,
            name: 'Dell',
            info: 'XXX',
            ein: 0
        }

        const result = await Manufacturer.create(newManufacturer);

        expect(result.dataValues).toEqual(newManufacturer);
    })

    it('should return a list of manufacturer', async () => {
        const result = await Manufacturer.findAll({
            limit: 10
        });

        const manufactures = result.map(m => m.dataValues);

        expect(manufactures.length).toBe(10);
        expect(manufactures[1]).toEqual({
            id: 2,
            name: 'manufacturer 2',
            info: 'company 2',
            ein: 0
        })
    })

    it('should return a specific manufacturer', async () => {
        const result = await Manufacturer.findAll({
            where: {
                id: 1
            }
        })

        expect(result[0].dataValues).toEqual({
            id: 1,
            name: 'manufacturer 1',
            info: 'company 1',
            ein: 0
        })
    })

    it('should delete a manufacturer', async () => {
        const result = await Manufacturer.destroy({
            where: {
                id: 1
            }
        })

        expect(result).toBe(1);
    })
})