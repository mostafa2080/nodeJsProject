const express = require('express');
const teacherController = require('./../Controller/teacherController');
const validateMW = require('./../Core/Validation/validateMW');
const validateTeacher = require('./../Core/Validation/validateTeacher');
const {
  checkAdmin,
  checkAdminOrTeacher,
} = require('./../Core/Authentication/authenticationMW');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const uploadImg = multer({
  fileFilter: (req, file, callBack) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callBack(null, true);
    } else {
      callBack(new Error('Add a valid Image'));
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, path.join(__dirname, '..', 'images', 'teacher'));
    },
    filename: (req, file, callBack) => {
      let extension = path.extname(file.originalname);
      let fileName = path.basename(file.originalname, extension);
      let unqImgName =
        file.fieldname + '-' + fileName + '-' + Date.now() + extension;
      callBack(null, unqImgName);
    },
  }),
});

const setImage = (req, res, next) => {
  if (req.file && req.file.path) req.body.image = req.file.path;
  next();
};
// Router
router
  .route('/teachers')
  .get(checkAdmin, teacherController.getAllTeachers)
  .post(
    uploadImg.single('image'),
    setImage,
    checkAdmin,
    validateTeacher.validateTeacherArray,
    validateMW,
    teacherController.addTeacher
  )
  .patch(
    uploadImg.single('image'),
    setImage,
    checkAdminOrTeacher,
    validateTeacher.optValidateTeacherArray,
    validateMW,
    teacherController.updateTeacher
  )
  .delete(
    checkAdmin,
    validateTeacher.optValidateTeacherArray,
    validateMW,
    teacherController.deleteTeacher
  );

module.exports = router;
