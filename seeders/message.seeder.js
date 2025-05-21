const mongoose = require("mongoose");
const Message = require("../models/Message");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedMessages = async (users) => {
  try {
    console.log("Seeding messages...");
    await Message.deleteMany({});

    const messages = Array.from({ length: 5 }, () => ({
      sender_id: faker.random.arrayElement(users)._id,
      receiver_id: faker.random.arrayElement(users)._id,
      content: faker.lorem.sentence(),
      sent_at: new Date(),
      is_read: faker.random.boolean(),
    }));

    const insertedMessages = await Message.insertMany(messages);
    console.log(`Inserted ${insertedMessages.length} messages`);
    return insertedMessages;
  } catch (error) {
    console.error("Error seeding messages:", error);
    throw error;
  }
};

module.exports = seedMessages;