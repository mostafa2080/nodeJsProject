const mongoose = require('mongoose');
require('./../Model/childModel');

const childrenSchema = mongoose.model('children');
// Get all Children
exports.getAllChildren = (req, res, next) => {
  childrenSchema
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

// Get Child by id
exports.getChildById = (req, res, next) => {
  childrenSchema
    .findOne({ _id: req.body._id })
    .then((data) => {
      if (data == null) {
        throw new Error('Child not Found');
      } else {
        res.status(200).json({ data });
      }
    })
    .catch((err) => next(err));
};

// Add a Child
exports.addChild = (req, res, next) => {
  console.log(req.body);
  new childrenSchema({
    fullName: req.body.fullName,
    age: req.body.age,
    level: req.body.level,
    address: {
      city: req.body.address.city,
      street: req.body.address.street,
      building: req.body.address.building,
    },
  })
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => next(err));
};

//Update a Child
exports.updateChild = (req, res, next) => {
  childrenSchema
    .updateOne(
      { _id: req.body._id },
      {
        $set: {
          fullName: req.body.fullName,
          age: req.body.age,
          level: req.body.level,
          address: {
            city: req.body.address.city,
            street: req.body.address.street,
            building: req.body.address.building,
          },
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) {
        next(new Error('Child not Found'));
      } else {
        res.status(200).json({ data });
      }
    })
    .catch((err) => next(err));
};

// Delete a Child
exports.deleteChild = (req, res, next) => {
  childrenSchema
    .deleteOne({ _id: req.body._id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error('Child not found'));
      } else res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};
