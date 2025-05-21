const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedAttendance = async (students, liveSessions) => {
  try {
    console.log("Seeding attendance...");
    await Attendance.deleteMany({});

    const attendance = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      live_session_id: faker.random.arrayElement(liveSessions)._id,
      status: faker.random.number({ min: 0, max: 1 }),
      attended_at: new Date(),
    }));

    const insertedAttendance = await Attendance.insertMany(attendance);
    console.log(`Inserted ${insertedAttendance.length} attendance records`);
    return insertedAttendance;
  } catch (error) {
    console.error("Error seeding attendance:", error);
    throw error;
  }
};

module.exports = seedAttendance;