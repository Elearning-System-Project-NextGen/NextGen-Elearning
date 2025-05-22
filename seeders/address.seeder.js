const mongoose = require("mongoose");
const Address = require("../models/Address");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedAddresses = async () => {
  try {
    console.log("Seeding addresses...");
    const adressModel = new Address();
    await adressModel.deleteMany({});

    const addresses = Array.from({ length: 5 }, () => ({
      country: faker.address.country(),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      postal_code: faker.address.zipCode(),
    }));

    const insertedAddresses = await adressModel.insertMany(addresses);
    console.log(`Inserted ${insertedAddresses.length} addresses`);
    return insertedAddresses;
  } catch (error) {
    console.error("Error seeding addresses:", error);
    throw error;
  }
};

module.exports = seedAddresses;
