import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { loginUser, logoutUser, registerTeacher,findTeacherByUsername } from "../controllers/teacher.controllers.js"
import {   sendQuizMail } from "../controllers/mail.controller.js"
import { sendAssignMail } from "../controllers/assignMail.controller.js"
import multer from 'multer';
import {storage} from "../cloudConfig.js";
import { v2 as cloudinary } from 'cloudinary';
const upload = multer({ storage });

const router = Router()

router.route("/register").post(upload.single('teacherImg'),registerTeacher)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/sendQuizEmail").post(sendQuizMail)
router.route("/sendAssignEmail").post(sendAssignMail)
router.route("/getOneTeacher/:userName").get(findTeacherByUsername);

export default router