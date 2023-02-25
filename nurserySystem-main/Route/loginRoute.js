const express = require('express');
const loginController = require('../Controller/loginController');
const validateLogin = require('../Core/Validation/validateLogin');

const router = express.Router();

router
  .route('/login')
  .post(validateLogin.postValidator, validateLogin, loginController.login);

module.exports = router;
