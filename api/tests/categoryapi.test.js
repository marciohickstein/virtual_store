const request = require('supertest');
const app = require('../src/httpserver'); // Import your Express app

describe('Test category endpoint', () => {

  it('should return a specific category', async () => {
    const response = await request(app)
      .get('/category/1')
      .expect(200);

    expect(response.body).toEqual({
      id: 1,
      name: "Electronics"
    });
  });

  it('should return a list of category', async () => {
    const response = await request(app)
      .get('/category')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });


  it.only('should create a category', (done) => {
    const data = {
      // Define the data you want to send for resource creation
      // For example, if it's a JSON API, you can send an object
      name: 'New Category',
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
});
