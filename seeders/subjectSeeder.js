const Subject = require("../models/Subject");

async function seedSubjects() {
  await Subject.deleteMany({});
  await Subject.create({
    title: {
      en: "Mathematics",
      ar: "الرياضيات",
    },
    description: {
      en: "Basic mathematics course",
      ar: "دورة في الرياضيات الأساسية",
    },
    grade_level: 10,
    is_free: true,
  });
  console.log("Subjects seeded");
}

module.exports = seedSubjects;
