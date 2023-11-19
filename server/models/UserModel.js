
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // 2109723@reva.edu.in is an example
        return /^[0-9]{7}@reva\.edu\.in$/.test(v);
      },
      message: props => `${props.value} is not a valid REVA University email address!`
    }
  },
  accountType: {
    type: String,
    enum: ["administrator", "student"],
    required: true,
    default: "student"
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
