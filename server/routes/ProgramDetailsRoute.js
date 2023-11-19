
const express = require('express');
const router = express.Router();
const ProgramDetailModel = require('../models/ProgramDetailModel');
const VerifyParameters = require('../controllers/VerifyParameters');
const AuthorizeAdministrator = require('../controllers/AuthorizeAdministator');


// Route to fetch all ProgramDetails
router.get('/', async (req, res) => {
    try {
        const programDetails = await ProgramDetailModel.find();
        return res.json(programDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route to create a new ProgramDetail
router.post('/',AuthorizeAdministrator, async (req, res) => {
    const { programName, duration, fee } = req.body;
    VerifyParameters(req, res, { programName, duration, fee });
    const programDetail = new ProgramDetailModel({
        programName, duration, fee
    });

    try {
        const programDetailInstance = await programDetail.save();
        return res.status(201).json(programDetailInstance);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
