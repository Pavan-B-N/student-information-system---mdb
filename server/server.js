const express = require("express")
const app = express()
const port = process.env.PORT || 5000

//configure dotenv
const dotenv = require("dotenv")
dotenv.config()

//configure cors
const cors = require("cors")
const corsOptions = [
    {
        origin: "http://localhost",
        methods: ["GET", "POST"]
    }
]

app.use(cors(corsOptions));

//middlewares
app.use(express.json())

const mongoose = require("mongoose")
let isMongoDBConnected = false;

// connect to MongoDB
(
    async () => {
        try {
            await mongoose.connect("mongodb://0.0.0.0:27017/studentsInfoSystem")
            console.log("Connected to MongoDB")
            isMongoDBConnected = true
        } catch (err) {
            console.log(err)
        }
    }
)();

app.use(async (req, res, next) => {
    if (isMongoDBConnected) {
        next()
    } else {
        res.send("Server is not connected to MongoDB")
    }
})

const AuthRoute = require("./routes/AuthRoute")
const ProgramDetailsRoute = require("./routes/ProgramDetailsRoute")
const CourseDetailsRoute = require("./routes/CourseDetailsRoute")
const EnrolledCoursesRoute = require("./routes/EnrolledCoursesRoute")
const GradeDetailsRoute = require("./routes/GradeDetailsRoute")
const StudentDetailsRoute = require("./routes/StudentDetailsRoute")

const VerifyJWT = require("./controllers/VerifyJWT")

app.use("/auth", AuthRoute)

app.use(VerifyJWT)

app.use("/program-detail", ProgramDetailsRoute)

app.use("/course-detail", CourseDetailsRoute)
app.use("/enrolled-courses", EnrolledCoursesRoute)
app.use("/grade-detail", GradeDetailsRoute)
app.use("/student-detail", StudentDetailsRoute)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})