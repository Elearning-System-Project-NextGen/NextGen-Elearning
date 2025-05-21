const mongoose = require("mongoose");
require("dotenv").config();
const seedRoles = require("./role.seeder");
const seedPermissions = require("./permission.seeder");
const seedUsers = require("./user.seeder");
const seedStudents = require("./student.seeder");
const seedTeachers = require("./teacher.seeder");
const seedAddresses = require("./address.seeder");
const seedSubjects = require("./subject.seeder");
const seedCourses = require("./course.seeder");
const seedLessons = require("./lesson.seeder");
const seedQuizzes = require("./quiz.seeder");
const seedQuizQuestions = require("./quizQuestion.seeder");
const seedStudentQuizAttempts = require("./studentQuizAttempt.seeder");
const seedStudentProgress = require("./studentProgress.seeder");
const seedLiveSessions = require("./liveSession.seeder");
const seedAssignments = require("./assignment.seeder");
const seedSubmissions = require("./submission.seeder");
const seedReviews = require("./review.seeder");
const seedTransactions = require("./transaction.seeder");
const seedMedia = require("./media.seeder");
const seedAttendance = require("./attendance.seeder");
const seedMessages = require("./message.seeder");
const seedSessions = require("./session.seeder");
const seedBlockedTokens = require("./blockedTokens.seeder");
const seedRolePermissions = require("./rolePermission.seeder");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedAll = async () => {
  try {
    await connectDB();

    const roles = await seedRoles();
    const permissions = await seedPermissions();
    const users = await seedUsers(roles);

    // Populate roles after seeding users
    const populatedUsers = await mongoose
      .model("User")
      .find()
      .populate("role_id");

    const students = await seedStudents(populatedUsers);

    const subjects = await seedSubjects(); // <--- initialize first
    const teachers = await seedTeachers(users, subjects); // <--- then use it
    const addresses = await seedAddresses();
    const courses = await seedCourses(subjects, teachers);
    const lessons = await seedLessons(courses);
    const quizzes = await seedQuizzes(courses);
    const quizQuestions = await seedQuizQuestions(quizzes);
    const studentQuizAttempts = await seedStudentQuizAttempts(
      students,
      quizzes
    );
    const studentProgress = await seedStudentProgress(
      students,
      courses,
      lessons
    );
    const liveSessions = await seedLiveSessions(courses);
    const assignments = await seedAssignments(courses);
    const submissions = await seedSubmissions(students, assignments);
    const reviews = await seedReviews(students, courses);
    const transactions = await seedTransactions(students, courses);
    const media = await seedMedia();
    const attendance = await seedAttendance(students, liveSessions);
    const messages = await seedMessages(users);
    const sessions = await seedSessions(users, devices);
    const blockedTokens = await seedBlockedTokens();
    const rolePermissions = await seedRolePermissions(roles, permissions);


    console.log("Seeding completed successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedAll();
