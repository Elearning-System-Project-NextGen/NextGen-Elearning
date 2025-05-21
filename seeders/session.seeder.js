const mongoose = require("mongoose");
const Session = require("../models/Session");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedSessions = async (users, devices) => {
  try {
    console.log("Seeding sessions...");
    await Session.deleteMany({});

    const sessions = users.slice(0, 3).map((user) => ({
      user_id: user._id,
      device_id: faker.random.arrayElement(devices)._id,
      login_time: new Date(),
      logout_time: faker.random.boolean() ? new Date() : null,
    }));

    const insertedSessions = await Session.insertMany(sessions);
    console.log(`Inserted ${insertedSessions.length} sessions`);
    return insertedSessions;
  } catch (error) {
    console.error("Error seeding sessions:", error);
    throw error;
  }
};

module.exports = seedSessions;