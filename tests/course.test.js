const chai = require("chai");
const request = require("supertest");
const app = require("../app");
const Subject = require("../models/Subject");
const expect = chai.expect;

describe("Course API", () => {
  let subjectId;
  before(async () => {
    const subject = await Subject.create({
      title: { en: "Test Subject", ar: "موضوع اختبار" },
      description: { en: "Test", ar: "اختبار" },
    });
    subjectId = subject._id;
  });

  it("should create a course", (done) => {
    request(app)
      .post("/api/courses")
      .set("Cookie", "token=valid-teacher-token")
      .send({
        subject_id: subjectId,
        title_en: "Algebra",
        title_ar: "الجبر",
        description_en: "Intro to algebra",
        description_ar: "مقدمة في الجبر",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Course created");
        done();
      });
  });

  it("should reject invalid course data", (done) => {
    request(app)
      .post("/api/courses")
      .set("Cookie", "token=valid-teacher-token")
      .send({
        subject_id: "",
        title_en: "A",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.include("required");
        done();
      });
  });
});
