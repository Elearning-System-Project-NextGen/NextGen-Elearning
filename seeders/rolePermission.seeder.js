const mongoose = require("mongoose");
const RolePermission = require("../models/RolePermission");

const seedRolePermissions = async (roles, permissions) => {
  try {
    console.log("Seeding role permissions...");

    const rolePermissionModel = new RolePermission();
    await rolePermissionModel.deleteMany({});

    const getPermissionIds = (keys) =>
      keys
        .map((key) => permissions.find((p) => p.permission_key === key)?._id)
        .filter(Boolean);

    const roleMap = Object.fromEntries(roles.map((r) => [r.name, r._id]));

    const adminPermissions = permissions.map((p) => ({
      role_id: roleMap["admin"],
      permission_id: p._id,
    }));

    const teacherPermissionKeys = [
      // core teaching and session management
      "COURSE_VIEW",
      "COURSE_VIEW_DETAIL",
      "COURSE_CREATE",
      "COURSE_UPDATE",
      "LESSON_VIEW",
      "LESSON_VIEW_DETAIL",
      "LESSON_CREATE",
      "LESSON_UPDATE",
      "LESSON_DELETE",
      "SUBJECT_VIEW",
      "SUBJECT_VIEW_DETAIL",
      "SUBJECT_CREATE",
      "SUBJECT_UPDATE",
      "SUBJECT_DELETE",
      "QUIZ_VIEW",
      "QUIZ_VIEW_DETAIL",
      "QUIZ_CREATE",
      "QUIZ_UPDATE",
      "QUIZ_DELETE",
      "QUIZQUESTION_VIEW",
      "QUIZQUESTION_VIEW_DETAIL",
      "QUIZQUESTION_CREATE",
      "QUIZQUESTION_UPDATE",
      "QUIZQUESTION_DELETE",
      "CERTIFICATE_VIEW",
      "CERTIFICATE_VIEW_DETAIL",
      "CERTIFICATE_CREATE",
      "CERTIFICATE_UPDATE",
      "CERTIFICATE_DELETE",
      "LIVESESSION_VIEW",
      "LIVESESSION_VIEW_DETAIL",
      "LIVESESSION_CREATE",
      "LIVESESSION_UPDATE",
      "LIVESESSION_DELETE",
      "ATTENDANCE_VIEW",
      "ATTENDANCE_VIEW_DETAIL",
      "ATTENDANCE_CREATE",
      "ATTENDANCE_UPDATE",
      "ATTENDANCE_DELETE",
      "STUDENTPROGRESS_VIEW",
      "STUDENTPROGRESS_VIEW_DETAIL",
      "STUDENTPROGRESS_CREATE",
      "STUDENTPROGRESS_UPDATE",
      "STUDENTPROGRESS_DELETE",
      "SUBMISSION_VIEW",
      "SUBMISSION_VIEW_DETAIL",
      "SUBMISSION_UPDATE",
      "SUBMISSION_DELETE",
      "STUDENTQUIZATTEMPT_VIEW",
      "STUDENTQUIZATTEMPT_VIEW_DETAIL",
      "STUDENTQUIZATTEMPT_UPDATE",
      "STUDENTQUIZATTEMPT_DELETE",
      "MESSAGE_VIEW",
      "MESSAGE_VIEW_DETAIL",
      "MESSAGE_CREATE",
      "MESSAGE_UPDATE",
      "MESSAGE_DELETE",
      "MEDIA_VIEW",
      "MEDIA_VIEW_DETAIL",
      "MEDIA_CREATE",
      "MEDIA_UPDATE",
      "MEDIA_DELETE",
      "TEACHER_VIEW",
      "TEACHER_VIEW_DETAIL",
      "TEACHER_UPDATE",
      "SESSION_VIEW",
      "SESSION_VIEW_DETAIL",
      "REVIEW_VIEW",
      
    ];

    const studentPermissionKeys = [
      "COURSE_VIEW",
      "COURSE_VIEW_DETAIL",
      "LESSON_VIEW",
      "LESSON_VIEW_DETAIL",
      "SUBJECT_VIEW",
      "SUBJECT_VIEW_DETAIL",
      "ENROLLMENT_CREATE",
      "ENROLLMENT_VIEW",
      "ENROLLMENT_VIEW_DETAIL",
      "QUIZ_VIEW",
      "QUIZ_VIEW_DETAIL",
      "STUDENTQUIZATTEMPT_CREATE",
      "STUDENTQUIZATTEMPT_VIEW",
      "STUDENTQUIZATTEMPT_VIEW_DETAIL",
      "SUBMISSION_CREATE",
      "SUBMISSION_VIEW",
      "SUBMISSION_VIEW_DETAIL",
      "STUDENTPROGRESS_VIEW",
      "STUDENTPROGRESS_VIEW_DETAIL",
      "CERTIFICATE_VIEW",
      "CERTIFICATE_VIEW_DETAIL",
      "MESSAGE_VIEW",
      "MESSAGE_VIEW_DETAIL",
      "MESSAGE_CREATE",
      "MESSAGE_UPDATE",
      "MESSAGE_DELETE",
      "REVIEW_VIEW",
      "REVIEW_CREATE",
      "REVIEW_UPDATE",
      "REVIEW_DELETE",
      "TRANSACTION_CREATE",
      "TRANSACTION_VIEW",
      "TRANSACTION_VIEW_DETAIL",
      "STUDENT_VIEW",
      "STUDENT_VIEW_DETAIL",
      "STUDENT_UPDATE",
      "ADDRESS_CREATE",
      "ADDRESS_VIEW",
      "ADDRESS_VIEW_DETAIL",
      "ADDRESS_UPDATE",
      "ADDRESS_DELETE",
      
    ];

    const rolePermissions = [
      ...adminPermissions,
      ...getPermissionIds(teacherPermissionKeys).map((pid) => ({
        role_id: roleMap["teacher"],
        permission_id: pid,
      })),
      ...getPermissionIds(studentPermissionKeys).map((pid) => ({
        role_id: roleMap["student"],
        permission_id: pid,
      })),
    ];

    const inserted = await rolePermissionModel.insertMany(rolePermissions);
    console.log(`Inserted ${inserted.length} role permissions`);
    return inserted;
  } catch (error) {
    console.error("Error seeding role permissions:", error);
    throw error;
  }
};

module.exports = seedRolePermissions;
