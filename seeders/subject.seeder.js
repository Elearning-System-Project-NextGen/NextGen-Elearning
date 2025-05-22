const mongoose = require("mongoose");
const Subject = require("../models/Subject");
const { faker } = require("@faker-js/faker");
const { t } = require("i18next");

const seedSubjects = async () => {
  try {
    console.log("Seeding subjects...");
    const subjectModel = new Subject()
    const subject = await subjectModel.deleteMany({});

    const subjects = [
      {
        title: { en: "Mathematics", ar: "الرياضيات" },
        description: {
          en: "Algebra and Calculus",
          ar: "الجبر والتفاضل والتكامل",
        },
        grade_level: 10,
        start_date: new Date("2025-01-01"),
        end_date: new Date("2025-06-30"),
        price_mode: 1,
        is_free: false,
      },
      {
        title: { en: "Physics", ar: "الفيزياء" },
        description: {
          en: "Mechanics and Thermodynamics",
          ar: "الميكانيكا والديناميكا الحرارية",
        },
        grade_level: 11,
        start_date: new Date("2025-01-01"),
        end_date: new Date("2025-06-30"),
        price_mode: 1,
        is_free: false,
      },
    ];

    const insertedSubjects = await subjectModel.insertMany(subjects);
    console.log(`Inserted ${insertedSubjects.length} subjects`);
    return insertedSubjects;
  } catch (error) {
    console.error("Error seeding subjects:", error);
    throw error;
  }
};

module.exports = seedSubjects;
