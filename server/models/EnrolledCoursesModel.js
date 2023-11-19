
const mongoose = require('mongoose');

const enrolledCoursesSchema = new mongoose.Schema({
  SRN: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseDetailModel',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    required: true,
    default:"active"
  },
  CGPA: {
    type: Number,
    required: true,
    default: 0
  },
  SEM: {
    type: Number,
    required: true
  }
});

const EnrolledCourse = mongoose.model('EnrolledCourse', enrolledCoursesSchema);

module.exports = EnrolledCourse;
