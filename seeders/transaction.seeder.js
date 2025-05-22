const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedTransactions = async (students, courses) => {
  try {
    console.log("Seeding transactions...");
    const transactionsModel = new Transaction();
    await transactionsModel.deleteMany({});

    const transactions = students.slice(0, 3).map((student) => ({
      student_id: student._id,
      course_id: faker.helpers.arrayElement(courses)._id,
      amount: faker.number.int({ min: 50, max: 500 }),
      transaction_date: faker.date.recent(),
      payment_method: faker.helpers.arrayElement(["credit_card", "paypal", "bank_transfer"]),
      status: 1,
    }));

    const insertedTransactions = await transactionsModel.insertMany(
      transactions
    );
    console.log(`Inserted ${insertedTransactions.length} transactions`);
    return insertedTransactions;
  } catch (error) {
    console.error("Error seeding transactions:", error);
    throw error;
  }
};

module.exports = seedTransactions;