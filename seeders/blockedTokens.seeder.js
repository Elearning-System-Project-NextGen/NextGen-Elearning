const mongoose = require("mongoose");
const BlockedTokens = require("../models/BlockedTokens");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedBlockedTokens = async () => {
  try {
    console.log("Seeding blocked tokens...");
    await BlockedTokens.deleteMany({});

    const blockedTokens = Array.from({ length: 3 }, () => ({
      token: faker.random.alphaNumeric(32),
      created_at: new Date(),
    }));

    const insertedBlockedTokens = await BlockedTokens.insertMany(blockedTokens);
    console.log(`Inserted ${insertedBlockedTokens.length} blocked tokens`);
    return insertedBlockedTokens;
  } catch (error) {
    console.error("Error seeding blocked tokens:", error);
    throw error;
  }
};

module.exports = seedBlockedTokens;