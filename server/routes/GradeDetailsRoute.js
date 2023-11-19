
const express = require('express');
const router = express.Router();
const GradeDetailModel = require('../models/GradesModel');
const VerifyParameters = require('../controllers/VerifyParameters');
const StudentInfoModel = require('../models/StudentInfoModel');

// Route to fetch all gradeDetails
router.get('/:email', async (req, res) => {
    const { email } = req.params;
    VerifyParameters(req, res, { email });
    try {
        const user=await StudentInfoModel.findOne({email})
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const gradeDetails = await GradeDetailModel.find({ SRN: user.SRN }).populate("details.courseId");
        return res.json(gradeDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route to create a new ProgramDetail
router.post('/', async (req, res) => {
    const { SRN, SEM, details } = req.body;
    // VerifyParameters(req, res, { SRN, SEM, details, result, numOfBacklogs });

    const gradeDetail = new GradeDetailModel({
        SRN, SEM, details
    });

    try {
        const gradeDetailInstance = await gradeDetail.save();
        return res.status(201).json(gradeDetailInstance);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
