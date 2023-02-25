const express = require('express');
const teacherController = require('./../Controller/teacherController');
const validateMW = require('./../Core/Validation/validateMW');
const validateTeacher = require('./../Core/Validation/validateTeacher');
const router = express.Router();
router
  .route('/teachers')
  .get(teacherController.getAllTeachers)
  .post(
    validateTeacher.validateTeacherArray,
    validateMW,
    teacherController.addTeacher
  )
  .patch(
    validateTeacher.optValidateTeacherArray,
    validateMW,
    teacherController.updateTeacher
  )
  .put(
    validateTeacher.optValidateTeacherArray,
    validateMW,
    teacherController.updateTeacher
  )
  .delete(
    validateTeacher.optValidateTeacherArray,
    validateMW,
    teacherController.deleteTeacher
  );

module.exports = router;
