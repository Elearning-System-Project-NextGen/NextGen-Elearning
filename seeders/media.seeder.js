const mongoose = require("mongoose");
const Media = require("../models/Media");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedMedia = async () => {
  try {
    console.log("Seeding media...");
    await Media.deleteMany({});

    const media = Array.from({ length: 5 }, () => ({
      url: faker.internet.url(),
      size: faker.random.number({ min: 1000, max: 1000000 }),
      type: faker.random.arrayElement(["video", "image", "document"]),
      duration: `${faker.random.number({ min: 10, max: 60 })} minutes`,
      model_type: faker.random.arrayElement(["Lesson", "Course"]),
    }));

    const insertedMedia = await Media.insertMany(media);
    console.log(`Inserted ${insertedMedia.length} media`);
    return insertedMedia;
  } catch (error) {
    console.error("Error seeding media:", error);
    throw error;
  }
};

module.exports = seedMedia;