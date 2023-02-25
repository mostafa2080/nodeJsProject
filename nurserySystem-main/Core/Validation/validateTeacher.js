const { body } = require('express-validator');
exports.validateTeacherArray = [
  body('_id').isMongoId().withMessage('Teacher ID must be an ObjectID'),
  body('fullName').isString().withMessage('Teacher Full Name must be a String'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Teacher Password must be a more than 4 elements'),
  body('email').isEmail().withMessage('Teacher Email must be a valid Email'),
  body('image').isString().withMessage('Teacher Image must be a String'),
];

// Optional
exports.optValidateTeacherArray = [
  body('_id').isMongoId().withMessage('Teacher ID must be an ObjectID'),
  body('fullName')
    .optional()
    .isString()
    .withMessage('Teacher Full Name must be a String'),
  body('password')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Teacher Password must be a more than 4 elements'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Teacher Email must be a valid Email'),
  body('image')
    .optional()
    .isString()
    .withMessage('Teacher Image must be a String'),
];
