const request = require('supertest');
const app = require('../../src/httpserver'); // Import your Express app

const CATEGORY_NAME_TO_TEST = `New Category To Test`;

let categories = [];

async function createResource(data) {
  const response = await request(app)
    .post('/category')
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
      name: `${CATEGORY_NAME_TO_TEST}_${i + 1}`,
    };

    const resource = await createResource(data);

    if (!resource) {
      break;
    }

    categories.push(resource);
  }
});

afterAll(async () => {
  // should delete a test category
  let response = await request(app)
    .delete(`/category/${categories[0].id}`)
    .expect(200);

  response = await request(app)
    .delete(`/category/${categories[2].id}`)
    .expect(200);
})

// TESTS
describe('Test category endpoint', () => {
  it('should create a category', (done) => {
    const data = {
      name: `New Category ${new Date().toLocaleString()}`,
    };

    request(app)
      .post('/category')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });

  });

  it('should return a list of category', async () => {
    const response = await request(app)
      .get('/category')
      .expect(200);

    const listOfResource = response.body;
    expect(listOfResource).toBeInstanceOf(Array);

    const objectToTest = {
      name: `${CATEGORY_NAME_TO_TEST}_3`,
    };

    expect(listOfResource.some((element) => element.name === objectToTest.name)).toBe(true);
  });

  it('should return a specific category', async () => {
    const response = await request(app)
      .get(`/category/${categories[0].id}`)
      .expect(200);

    expect(response.body).toEqual({
      id: categories[0].id,
      name: CATEGORY_NAME_TO_TEST + '_1'
    });
  });

  it('should delete a specific category', async () => {
    // should delete a test category
    const response = await request(app)
      .delete(`/category/${categories[1].id}`)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      message: `Resource was delete successfully`
    });
  });

});

