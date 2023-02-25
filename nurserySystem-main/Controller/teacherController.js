const mongoose = require("mongoose");
require("./../Model/teacherModel");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const teachersSchema = mongoose.model("teachers");

// Get all Teachers
exports.getAllTeachers = (req, res, next) => {
  teachersSchema
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

// Add a Teacher
exports.addTeacher = (req, res, next) => {
  new teachersSchema({
    _id: req.body._id,
    fullName: req.body.fullName,
    password: bcrypt.hashSync(req.body.password, salt),
    email: req.body.email,
    image: req.body.image,
  })
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => next(err));
};

//Update a Teacher
exports.updateTeacher = (req, res, next) => {
  let hashPass = req.body.password ? bcrypt.hashSync(req.body.password, salt) : req.body.password;
  teachersSchema
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          fullName: req.body.fullName,
          password: hashPass,
          email: req.body.email,
          image: req.body.image,
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) {
        next(new Error("Teacher not found"));
      } else res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

// Delete a Teacher
exports.deleteTeacher = (req, res, next) => {
  teachersSchema
    .deleteOne({ _id: req.body._id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("Teacher not found"));
      } else res.status(200).json({ data });
    })
      .catch((err) => next(err));
};
