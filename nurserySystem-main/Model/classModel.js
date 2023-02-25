let mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

let classSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, 'Please Enter Class Name'],
  },

  supervisor: {
    ref: 'teachers',
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please Enter Class Supervisor'],
  },
  children: [
    {
      ref: 'children',
      type: Number,
      required: [true, 'Please Enter Class Children'],
    },
  ],
});
classSchema.plugin(autoIncrement, { id: 'classId', inc_field: '_id' });
mongoose.model('class', classSchema);
