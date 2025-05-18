const chai = require("chai");
const request = require("supertest");
const app = require("../app");
const Course = require("../models/Course");
const User = require("../models/User");
const expect = chai.expect;

describe("Enrollment API", () => {
  let courseId, studentToken, nonStudentToken;

  before(async () => {
    // Create a test course
    const course = await Course.create({
      subject_id: "507f1f77bcf86cd799439011",
      teacher_id: "507f191e810c19729de860ea",
      title: { en: "Test Course", ar: "دورة اختبار" },
      description: { en: "Test", ar: "اختبار" },
      is_published: true,
    });
    courseId = course._id;

    // Create a student user and get JWT
    const student = await User.create({
      full_name: "Student User",
      username: "studentuser",
      email: "student@example.com",
      password: await require("bcryptjs").hash("password", 10),
      role: "student",
      language: "en",
    });
    studentToken = require("jsonwebtoken").sign(
      { id: student._id, role: student.role, language: student.language },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Create a non-student user (teacher) and get JWT
    const teacher = await User.create({
      full_name: "Teacher User",
      username: "teacheruser",
      email: "teacher@example.com",
      password: await require("bcryptjs").hash("password", 10),
      role: "teacher",
      language: "en",
    });
    nonStudentToken = require("jsonwebtoken").sign(
      { id: teacher._id, role: teacher.role, language: teacher.language },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  it("should enroll a student in a course", (done) => {
    request(app)
      .post("/api/enrollments")
      .set("Cookie", `token=${studentToken}`)
      .send({ course_id: courseId })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Enrolled successfully");
        done();
      });
  });

  it("should prevent duplicate enrollment", (done) => {
    request(app)
      .post("/api/enrollments")
      .set("Cookie", `token=${studentToken}`)
      .send({ course_id: courseId })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal(
          "You are already enrolled in this course"
        );
        done();
      });
  });

  it("should prevent non-students from enrolling", (done) => {
    request(app)
      .post("/api/enrollments")
      .set("Cookie", `token=${nonStudentToken}`)
      .send({ course_id: courseId })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal("Only students can enroll in courses");
        done();
      });
  });
});
