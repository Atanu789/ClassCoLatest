import { Router } from "express"
import { registerStudent, loginUser, logoutUser, findUser, getAllStudents,findStudentByUsername } from "../controllers/student.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import multer from 'multer';
import {storage} from "../cloudConfig.js";
import { v2 as cloudinary } from 'cloudinary';
const upload = multer({ storage });
const router = Router()

router.route("/register").post(upload.single('studentImg'),registerStudent)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getOneStudents/:userName").get(findStudentByUsername);
router.route("/getStudents").get(getAllStudents);
router.route("/find/:userId").get(findUser);

export default router