
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentInfoSchema = new Schema({
    SRN: {
        type: String,
        required: true,
        length: 8,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // 2109723@reva.edu.in is an example
                return /^[0-9]{7}@reva\.edu\.in$/.test(v);
            },
            message: props => `${props.value} is not a valid REVA University email address!`
        }
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    residencyStatus: {
        type: String,
        enum: ['dayscholar', 'pg', 'hostel'],
        required: true
    },
    profileImage: {
        type: String,
        default:""
    },
    programID: {
        type: Schema.Types.ObjectId,
        ref: 'ProgramDetailModel',
        required: true
    },
    currentSemester: {
        type: Number,
        required: true
    }
});

const StudentInfoModel = mongoose.model('StudentInfoModel', StudentInfoSchema);

module.exports = StudentInfoModel;
