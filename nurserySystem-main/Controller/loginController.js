const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const teacherSchema = mongoose.model('teachers');

exports.login = (request, response, next) => {
  teacherSchema
    .findOne({ email: request.body.email })
    .then((teacher) => {
      if (teacher == null) throw new Error('Result Not Found');
      let result = bcrypt.compareSync(request.body.password, teacher.password);
      if (!result) throw new Error('Wrong email or password');
      else {
        if (teacher._id == '507f1f77bcf86cd799439011') {
          request.role = 'admin';
        } else {
          request.role = 'teacher';
        }
        let token = jwt.sign(
          { id: teacher._id, role: request.role },
          'ostrack',
          { expiresIn: '8h' }
        );
        response.status(200).json({ token: token, message: 'Authorized' });
      }
    })
    .catch((error) => {
      error.status = 401;
      next(error);
    });
};

// exports.login = (request, response, next) => {
//   let token = jwt.sign(
//     { id: '507f1f77bcf86cd799439011', role: 'admin' },
//     'osTrack',
//     { expiresIn: '8h' }
//   );
//   response.status(200).json({ token: token, message: 'Authorized' });
// };
