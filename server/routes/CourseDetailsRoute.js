const express = require('express');
const router = express.Router();
const CourseDetailModel = require('../models/CourseDetailModel');
const VerifyParameters = require('../controllers/VerifyParameters');
const AuthorizeAdministrator = require('../controllers/AuthorizeAdministator');

// Route to fetch all courseDetails
router.get('/', async (req, res) => {
    try {
        const courseDetails = await CourseDetailModel.find();
        return res.json(courseDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route to create a new courseDetails
router.post('/',AuthorizeAdministrator, async (req, res) => {
    const { courseName, duration } = req.body;
    VerifyParameters(req, res, { courseName, duration });
    
    const courseDetail = new CourseDetailModel({
        courseName, duration
    });

    try {
        const courseDetailInstance = await courseDetail.save();
        return res.status(201).json(courseDetailInstance);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
