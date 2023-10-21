const request = require('supertest');
const app = require('../../src/httpserver'); // Import your Express app

let resources = [];
const api = 'product';
const RESOURCE_NAME_TO_TEST = `New Resource To Test`;

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
            title: `${RESOURCE_NAME_TO_TEST}_${i + 1}`,
            description: `High-end resource ${i + 1}`,
            manufacturerId: 1,
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
        const data = {
            name: `New Resource ${new Date().toLocaleString()}`,
        };

        request(app)
            .post(`/${api}`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });

    });

    it(`should return a list of ${api}`, async () => {
        const response = await request(app)
            .get(`/${api}`)
            .expect(200);

        const listOfResource = response.body;
        expect(listOfResource).toBeInstanceOf(Array);

        const objectToTest = {
            title: `${RESOURCE_NAME_TO_TEST}_3`,
            description: "High-end resource",
            manufacturerId: 1,
        };

        expect(listOfResource.some((element) => element.title === objectToTest.title)).toBe(true);
    });

    it(`should return a specific ${api}`, async () => {
        const response = await request(app)
            .get(`/${api}/${resources[0].id}`)
            .expect(200);

        expect(response.body).toEqual({
            id: resources[0].id,
            title: `${RESOURCE_NAME_TO_TEST}_1`,
            description: "High-end resource 1",
            manufacturerId: 1,
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

