const mongoose = require("mongoose");
const Permission = require("../models/Permission");

const seedPermissions = async () => {
  try {
    console.log("Seeding permissions...");

    const permissionModel = new Permission();

    await permissionModel.deleteMany();

    const permissions = [
      // Student
      "STUDENT_VIEW",
      "STUDENT_VIEW_DETAIL",
      "STUDENT_CREATE",
      "STUDENT_UPDATE",
      "STUDENT_DELETE",
      // Teacher
      "TEACHER_VIEW",
      "TEACHER_VIEW_DETAIL",
      "TEACHER_CREATE",
      "TEACHER_UPDATE",
      "TEACHER_DELETE",
      // Role
      "ROLE_VIEW",
      "ROLE_VIEW_DETAIL",
      "ROLE_CREATE",
      "ROLE_UPDATE",
      "ROLE_DELETE",
      // Permission
      "PERMISSION_VIEW",
      "PERMISSION_VIEW_DETAIL",
      "PERMISSION_CREATE",
      "PERMISSION_UPDATE",
      "PERMISSION_DELETE",
      // RolePermission
      "ROLEPERMISSION_VIEW",
      "ROLEPERMISSION_VIEW_DETAIL",
      "ROLEPERMISSION_CREATE",
      "ROLEPERMISSION_UPDATE",
      "ROLEPERMISSION_DELETE",
      // Course
      "COURSE_VIEW",
      "COURSE_VIEW_DETAIL",
      "COURSE_CREATE",
      "COURSE_UPDATE",
      "COURSE_DELETE",
      // Lesson
      "LESSON_VIEW",
      "LESSON_VIEW_DETAIL",
      "LESSON_CREATE",
      "LESSON_UPDATE",
      "LESSON_DELETE",
      // Subject
      "SUBJECT_VIEW",
      "SUBJECT_VIEW_DETAIL",
      "SUBJECT_CREATE",
      "SUBJECT_UPDATE",
      "SUBJECT_DELETE",
      // Quiz
      "QUIZ_VIEW",
      "QUIZ_VIEW_DETAIL",
      "QUIZ_CREATE",
      "QUIZ_UPDATE",
      "QUIZ_DELETE",
      // QuizQuestion
      "QUIZQUESTION_VIEW",
      "QUIZQUESTION_VIEW_DETAIL",
      "QUIZQUESTION_CREATE",
      "QUIZQUESTION_UPDATE",
      "QUIZQUESTION_DELETE",
      // Certificate
      "CERTIFICATE_VIEW",
      "CERTIFICATE_VIEW_DETAIL",
      "CERTIFICATE_CREATE",
      "CERTIFICATE_UPDATE",
      "CERTIFICATE_DELETE",
      // LiveSession
      "LIVESESSION_VIEW",
      "LIVESESSION_VIEW_DETAIL",
      "LIVESESSION_CREATE",
      "LIVESESSION_UPDATE",
      "LIVESESSION_DELETE",
      // Session
      "SESSION_VIEW",
      "SESSION_VIEW_DETAIL",
      "SESSION_CREATE",
      "SESSION_UPDATE",
      "SESSION_DELETE",
      // StudentProgress
      "STUDENTPROGRESS_VIEW",
      "STUDENTPROGRESS_VIEW_DETAIL",
      "STUDENTPROGRESS_CREATE",
      "STUDENTPROGRESS_UPDATE",
      "STUDENTPROGRESS_DELETE",
      // Attendance
      "ATTENDANCE_VIEW",
      "ATTENDANCE_VIEW_DETAIL",
      "ATTENDANCE_CREATE",
      "ATTENDANCE_UPDATE",
      "ATTENDANCE_DELETE",
      // Enrollment
      "ENROLLMENT_VIEW",
      "ENROLLMENT_VIEW_DETAIL",
      "ENROLLMENT_CREATE",
      "ENROLLMENT_UPDATE",
      "ENROLLMENT_DELETE",
      // Submission
      "SUBMISSION_VIEW",
      "SUBMISSION_VIEW_DETAIL",
      "SUBMISSION_CREATE",
      "SUBMISSION_UPDATE",
      "SUBMISSION_DELETE",
      // StudentQuizAttempt
      "STUDENTQUIZATTEMPT_VIEW",
      "STUDENTQUIZATTEMPT_VIEW_DETAIL",
      "STUDENTQUIZATTEMPT_CREATE",
      "STUDENTQUIZATTEMPT_UPDATE",
      "STUDENTQUIZATTEMPT_DELETE",
      // Message
      "MESSAGE_VIEW",
      "MESSAGE_VIEW_DETAIL",
      "MESSAGE_CREATE",
      "MESSAGE_UPDATE",
      "MESSAGE_DELETE",
      // Media
      "MEDIA_VIEW",
      "MEDIA_VIEW_DETAIL",
      "MEDIA_CREATE",
      "MEDIA_UPDATE",
      "MEDIA_DELETE",
      // Device
      "DEVICE_VIEW",
      "DEVICE_VIEW_DETAIL",
      "DEVICE_CREATE",
      "DEVICE_UPDATE",
      "DEVICE_DELETE",
      // Transaction
      "TRANSACTION_VIEW",
      "TRANSACTION_VIEW_DETAIL",
      "TRANSACTION_CREATE",
      "TRANSACTION_UPDATE",
      "TRANSACTION_DELETE",
      // Review
      "REVIEW_VIEW",
      "REVIEW_CREATE",
      "REVIEW_UPDATE",
      "REVIEW_DELETE",
      // BlockedTokens
      "BLOCKEDTOKENS_VIEW",
      "BLOCKEDTOKENS_VIEW_DETAIL",
      "BLOCKEDTOKENS_CREATE",
      "BLOCKEDTOKENS_DELETE",
      // Address
      "ADDRESS_VIEW",
      "ADDRESS_VIEW_DETAIL",
      "ADDRESS_CREATE",
      "ADDRESS_UPDATE",
      "ADDRESS_DELETE",
      // Auth
      "AUTH_LOGOUT",
    ];

    const permissionDocs = permissions.map((key) => ({ permission_key: key }));
    await permissionModel.insertMany(permissionDocs);

    console.log("Permissions seeded");

    return await permissionModel.getAll();
  } catch (error) {
    console.error("Error seeding permissions:", error);
    throw error;
  }
};

module.exports = seedPermissions;
