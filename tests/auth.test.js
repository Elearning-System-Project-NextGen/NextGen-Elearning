const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Auth API', () => {
  it('should register a user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({
        full_name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        role: 'student',
        language: 'en'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User registered');
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Logged in');
        expect(res).to.have.cookie('token');
        done();
      });
  });
});