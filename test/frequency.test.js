const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /frequency endpoint', () => {
  it('should return correct objec with input \'aaBBAAbbaa\'', () => {
    const s = 'aaBBAAbbaa';
    const expectedObj =
    {
      unique: 2,
      average: 5,
      highest: 'a',
      'a': 6,
      'b': 4
    };

    return supertest(app)
      .get('/frequency')
      .query({ s: s })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.eql(expectedObj);
      });
  });

  it('should return status 400 if no valid string is entered', () => {
    return supertest(app)
      .get('/frequency')
      .query( { s : ''})
      .expect(400, 'Invalid request');
  });

});