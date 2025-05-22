const mongoose = require("mongoose");
const Message = require("../models/Message");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedMessages = async (users) => {
  try {
    console.log("Seeding messages...");
    const messageModel = new Message();
    await messageModel.deleteMany({});

    const messages = Array.from({ length: 5 }, () => ({
      sender_id: faker.helpers.arrayElement(users)._id,
      receiver_id: faker.helpers.arrayElement(users)._id,
      content: faker.lorem.sentence(),
      sent_at: faker.date.recent(),
      is_read: faker.datatype.boolean(),
    }));

    const insertedMessages = await messageModel.insertMany(messages);
    console.log(`Inserted ${insertedMessages.length} messages`);
    return insertedMessages;
  } catch (error) {
    console.error("Error seeding messages:", error);
    throw error;
  }
};

module.exports = seedMessages;