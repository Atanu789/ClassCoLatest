import express from "express";
import cors from "cors"
import cookieParser  from "cookie-parser";
const app=express();


app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this origin
    credentials: true,                // Enable credentials (cookies)
}));
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())







import  studentRouter from "./routes/student.routes.js"
import notesRouter from "./routes/notes.routes.js"
app.use("/api/v1/students",studentRouter)
app.use("/api/v1/students",notesRouter)
app.use("/api/v1/students",assignmentRouter)
app.use("/api/v1/students",quizzRouter)
app.use("/api/v1/students",studentRouter)
//assignment
import assignmentRouter from "./routes/assignment.routes.js"
import  teacherRouter from "./routes/teacher.routes.js"
import quizzRouter from "./routes/quizz.routes.js"
import { sendQuizMail } from "./controllers/mail.controller.js"
import { getAllStudents } from "./controllers/student.controller.js"
import { sendAssignMail } from "./controllers/assignMail.controller.js"
app.use("/api/v1/teachers",teacherRouter)
app.use("/api/v1/teachers",assignmentRouter)
app.use("/api/v1/teachers",quizzRouter)
// Route for sending mail
app.use("/api/v1/teachers",getAllStudents)
app.use("/api/v1/teachers",sendQuizMail)
 app.use("/api/v1/teachers",sendAssignMail)

export default app;