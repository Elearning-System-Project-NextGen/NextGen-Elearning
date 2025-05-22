const Device = require("../models/Device");
const { faker } = require("@faker-js/faker");

const seedDevices = async (users) => {
  try {
      console.log("Seeding devices...");
      const deviceModel = new Device();
      await deviceModel.deleteMany({});

    const devices = users.map((user, index) => ({
      name: `Device ${index + 1}`,
      bigid: faker.number.int({ min: 1000, max: 9999 }),
      user_id: user._id,
      created_at: faker.date.recent(30),
    }));

    const insertedDevices = await deviceModel.insertMany(devices);
    console.log(`Inserted ${insertedDevices.length} devices`);
    return insertedDevices;
  } catch (error) {
    console.error("Error seeding devices:", error);
    throw error;
  }
};

module.exports = seedDevices;
