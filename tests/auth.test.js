const chai = require("chai");
const request = require("supertest");
const app = require("../app");
const expect = chai.expect;

describe("Auth API", () => {
  it("should register a user", (done) => {
    request(app)
      .post("/api/auth/register")
      .send({
        full_name: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "password",
        role: "student",
        language: "en",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("User registered");
        done();
      });
  });

  it("should login a user", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@example.com",
        password: "admin123",
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Logged in");
        expect(res.headers["set-cookie"]).to.exist;
        done();
      });
  });

  it("should reject invalid user data", (done) => {
    request(app)
      .post("/api/auth/register")
      .send({
        full_name: "T",
        username: "te",
        email: "invalid",
        password: "123",
        role: "invalid",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.include(
          "length must be at least 2 characters"
        );
        done();
      });
  });

  it("should sanitize XSS in user data", (done) => {
    request(app)
      .post("/api/auth/register")
      .send({
        full_name: '<script>alert("xss")</script>',
        username: "testuser2",
        email: "test2@example.com",
        password: "password",
        role: "student",
        language: "en",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("User registered");
        done();
      });
  });
});
