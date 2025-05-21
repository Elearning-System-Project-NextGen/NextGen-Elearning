const mongoose = require("mongoose");
const LiveSession = require("../models/LiveSession");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedLiveSessions = async (courses) => {
  try {
    console.log("Seeding live sessions...");
    await LiveSession.deleteMany({});

    const liveSessions = courses.map((course, index) => {
      const startTime = faker.date.soon(10);
      return {
        course_id: course._id,
        title: {
          en: `Live Session ${index + 1} for ${course.title.en}`,
          ar: `جلسة مباشرة ${index + 1} لـ ${course.title.ar}`,
        },
        start_time: startTime,
        end_time: new Date(startTime.getTime() + 60 * 60 * 1000), // 1 hour later
        meeting_url: faker.internet.url(),
      };
    });

    const insertedLiveSessions = await LiveSession.insertMany(liveSessions);
    console.log(`Inserted ${insertedLiveSessions.length} live sessions`);
    return insertedLiveSessions;
  } catch (error) {
    console.error("Error seeding live sessions:", error);
    throw error;
  }
};

module.exports = seedLiveSessions;