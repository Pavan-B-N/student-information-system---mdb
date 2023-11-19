const express = require('express');
const router = express.Router();
const StudentInfoModel = require('../models/StudentInfoModel');
const VerifyParameters = require('../controllers/VerifyParameters');
const AuthorizeAdministrator = require('../controllers/AuthorizeAdministator');

// Route to fetch all studentDetails
router.get('/', async (req, res) => {
    try {
        const studentDetails = await StudentInfoModel.find();
        return res.json(studentDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:email', async (req, res) => {
    const {email}=req.params;
    console.log(email)
    VerifyParameters(req, res, { email });
    try {
        const studentDetails = await StudentInfoModel.findOne({email}).populate('programID');
        console.log(studentDetails)
        return res.json(studentDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Route to create a new ProgramDetail
router.post('/',AuthorizeAdministrator, async (req, res) => {
    const { SRN, email, phone,address,residencyStatus,programID,currentSemester ,name} = req.body;

    VerifyParameters(req, res, { SRN, email, phone,address,residencyStatus,programID,currentSemester,name})
    const studentDetail = new StudentInfoModel({
        SRN, email, phone,address,residencyStatus,programID,currentSemester,name
    });

    try {
        const studentDetailInstance = await studentDetail.save();
        return res.status(201).json(studentDetailInstance);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;