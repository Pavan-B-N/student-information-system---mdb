
const mongoose = require('mongoose');

const courseDetailSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
});

const CourseDetailModel = mongoose.model('CourseDetailModel', courseDetailSchema);

module.exports = CourseDetailModel;
