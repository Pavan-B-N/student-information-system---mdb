const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const VerifyParameters = require("../controllers/VerifyParameters");



// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        VerifyParameters(req, res, { email, password })

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const user = await newUser.save();

        //once account created succesfully, directly login the user by sending the jwt token
        // Generate JWT token
        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({ userId: user._id }, secretKey);
        return res.status(200).json({ token, user: { email: user.email, accountType: user.accountType } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:error.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        VerifyParameters(req, res, { email, password })
        // Check if the username exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email, User doesn't exist" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const secretKey = process.env.SECRET_KEY
 
        const token = jwt.sign({ userId: user._id }, secretKey);

        return res.status(200).json({ token, user: { email: user.email, accountType: user.accountType } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
