const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedTransactions = async (students, courses) => {
  try {
    console.log("Seeding transactions...");
    await Transaction.deleteMany({});

    const transactions = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.random.arrayElement(courses)._id,
      amount: faker.random.number({ min: 50, max: 500 }),
      transaction_date: new Date(),
      payment_method: faker.random.arrayElement(["credit_card", "paypal", "bank_transfer"]),
      status: 1,
    }));

    const insertedTransactions = await Transaction.insertMany(transactions);
    console.log(`Inserted ${insertedTransactions.length} transactions`);
    return insertedTransactions;
  } catch (error) {
    console.error("Error seeding transactions:", error);
    throw error;
  }
};

module.exports = seedTransactions;