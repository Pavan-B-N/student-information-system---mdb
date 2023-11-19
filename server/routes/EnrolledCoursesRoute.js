
const express = require('express');
const router = express.Router();
const EnrolledCoursesDetailModel = require('../models/EnrolledCoursesModel');
const VerifyParameters = require('../controllers/VerifyParameters');

const StudentInfoModel = require('../models/StudentInfoModel');
// Route to fetch all courseDetails
router.get('/:email', async (req, res) => {
    const { email } = req.params;
    VerifyParameters(req, res, { email });
    
    try {
        const user=await StudentInfoModel.findOne({email})
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // console.log(user)
        const courseDetails = await EnrolledCoursesDetailModel.find({SRN:user.SRN}).populate('courseId');

        return res.json(courseDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route to create a new courseDetails
router.post('/', async (req, res) => {
    const { SRN, courseId, SEM } = req.body;
    VerifyParameters(req, res, { SRN, courseId,SEM });

    const courseDetail = new EnrolledCoursesDetailModel({
        SRN, courseId, SEM
    });

    try {
        const courseDetailInstance = await courseDetail.save();
        return res.status(201).json(courseDetailInstance);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
