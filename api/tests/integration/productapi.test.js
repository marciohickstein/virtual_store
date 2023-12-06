const request = require('supertest');
const app = require('../../src/httpserver'); // Import your Express app

let resources = [];
const api = 'product';
const RESOURCE_NAME_TO_TEST = `New Resource To Test`;

const productToTest = {
    title: `New Product ${new Date().toLocaleString()}`,
    description: `New High-end product ${new Date().toLocaleString()}`,
    manufacturerId: 5,
    price: 1,
};

async function createResource(data) {
    const response = await request(app)
        .post(`/${api}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

    return resource = response.body;
}

beforeAll(async () => {
    // create all test cases
    for (let i = 0; i < 3; i++) {
        const data = {
            title: `${RESOURCE_NAME_TO_TEST}_${i + 1}_${new Date().toLocaleString()}`,
            description: `High-end resource x ${i + 1}`,
            manufacturerId: 5,
            price: 1,
        };

        const resource = await createResource(data);

        if (!resource) {
            break;
        }

        resources.push(resource);
    }
});

afterAll(async () => {
    // should delete a test category
    let response = await request(app)
        .delete(`/${api}/${resources[0].id}`)
        .expect(200);

    response = await request(app)
        .delete(`/${api}/${resources[2].id}`)
        .expect(200);
})

// TESTS
describe(`Test ${api} endpoint`, () => {

    it(`should create a ${api}`, (done) => {
        request(app)
            .post(`/${api}`)
            .send(productToTest)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                return done();
            });

    });

    it(`should return a list of ${api}`, async () => {
        const response = await request(app)
            .get(`/${api}`)
            .expect(200);

        const listOfResource = response.body;
        expect(listOfResource).toBeInstanceOf(Array);

        expect(listOfResource.some((element) => element.title === productToTest.title)).toBe(true);
    });

    it(`should return a specific ${api}`, async () => {
        const response = await request(app)
            .get(`/${api}/${resources[0].id}`)
            .expect(200);

        const product = {
            ...response.body,
            title: `${RESOURCE_NAME_TO_TEST}_1`
        }
        expect(product).toEqual({
            id: resources[0].id,
            title: `${RESOURCE_NAME_TO_TEST}_1`,
            description: "High-end resource x 1",
            manufacturerId: 5,
            price: "1",
        });
    });

    it(`should delete a specific ${api}`, async () => {
        // should delete a test category
        const response = await request(app)
            .delete(`/${api}/${resources[1].id}`)
            .expect(200);

        expect(response.body).toEqual({
            success: true,
            message: `Resource was delete successfully`
        });
    });

});

