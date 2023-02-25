const express = require('express');
const classController = require('../Controller/classController.js');
const validateMW = require('../Core/Validation/validateMW');
const validateClass = require('../Core/Validation/validateClass.js');

const router = express.Router();

router
  .route('/class')
  .get(classController.getAllClasses)
  .post(validateClass.validateClassArray, validateMW, classController.addClass)
  .patch(
    validateClass.optValidateClassArray,
    validateMW,
    classController.updateClass
  )
  .delete(
    validateClass.optValidateClassArray,
    validateMW,
    classController.deleteClass
  );

router
  .route('/class/:id')
  .get(validateMW, classController.getClassById)
  .delete(validateMW, classController.deleteClass);

router.get('/classChildern/:id', validateMW, classController.getClassChildren);

router.get(
  '/classTeacher/:id',

  validateMW,
  classController.getClassSupervisor
);
module.exports = router;
