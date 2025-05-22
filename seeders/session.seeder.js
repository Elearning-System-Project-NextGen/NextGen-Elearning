const mongoose = require("mongoose");
const Session = require("../models/Session");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedSessions = async (users, devices) => {
  try {
    console.log("Seeding sessions...");
    const sessionModel = new Session();
    await sessionModel.deleteMany({});

    const sessions = users.slice(0, 3).map((user) => ({
      token: faker.string.uuid(), 
      user_id: user._id,
      device_id: faker.helpers.arrayElement(devices)._id,
      login_time: faker.date.recent(),
      logout_time: faker.datatype.boolean() ? faker.date.recent() : null,
    }));

    const insertedSessions = await sessionModel.insertMany(sessions);
    console.log(`Inserted ${insertedSessions.length} sessions`);
    return insertedSessions;
  } catch (error) {
    console.error("Error seeding sessions:", error);
    throw error;
  }
};

module.exports = seedSessions;