
const mongoose = require('mongoose');

const programDetailSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
});

const ProgramDetailModel = mongoose.model('ProgramDetailModel', programDetailSchema);

module.exports = ProgramDetailModel;
