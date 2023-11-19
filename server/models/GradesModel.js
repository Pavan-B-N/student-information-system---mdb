
const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema(
    {
        SRN: {
            type: String,
            required: true
        },
        SEM: {
            type: Number,
            required: true
        },
        details: [{
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CourseDetailModel',
                required: true
            },
            CGPA: {
                type: Number,
                required: true
            }
        }],
        numOfBacklogs: {
            type: Number,
            required: true,
            default: function () {
                let backlogs = 0;
                this.details.forEach(detail => {
                    if (detail.CGPA < 4.0) {
                        backlogs++;
                    }
                });
                return backlogs;
            }
        },
        result: {
            type: String,
            enum: ['pass', 'fail'],
            required: true,
            default: function () {
                console.log(this.numOfBacklogs)
                return this.numOfBacklogs > 0 ? 'fail' : 'pass';
            }
        },
    },
);


const GradesModel = mongoose.model('GradesModel', gradesSchema);

module.exports = GradesModel;
