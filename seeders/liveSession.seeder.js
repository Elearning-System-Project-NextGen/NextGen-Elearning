const mongoose = require("mongoose");
const LiveSession = require("../models/LiveSession");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedLiveSessions = async (courses) => {
  try {
    console.log("Seeding live sessions...");
    const liveSessionModel = new LiveSession();
    await liveSessionModel.deleteMany({});

    const liveSessions = courses.map((course) => {
      const schedule = faker.date.soon(10);

      return {
        course_id: course._id,
        schedule: schedule,
        streaming_url: faker.internet.url(),
        recording_url: faker.internet.url(),
        attendance_required: faker.datatype.boolean(),
      };
    });

    const insertedLiveSessions = await liveSessionModel.insertMany(
      liveSessions
    );
    console.log(`Inserted ${insertedLiveSessions.length} live sessions`);
    return insertedLiveSessions;
  } catch (error) {
    console.error("Error seeding live sessions:", error);
    throw error;
  }
};

module.exports = seedLiveSessions;
