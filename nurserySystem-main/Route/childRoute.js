const express = require('express');
const childController = require('./../Controller/childController');
const validateMW = require('./../Core/Validation/validateMW');
const validateChild = require('./../Core/Validation/validateChild');

const router = express.Router();
router
  .route('/children')
  .get(childController.getAllChildren)
  .post(validateChild.validateChildArray, validateMW, childController.addChild)
  .patch(
    validateChild.optValidateChildArray,
    validateMW,
    childController.updateChild
  )
  .delete(
    validateChild.optValidateChildArray,
    validateMW,
    childController.deleteChild
  );

router.route('/children/:id').get(validateMW, childController.getChildById);

module.exports = router;
