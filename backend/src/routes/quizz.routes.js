import { Router } from "express";
import { getQuizz, giveQuiz } from "../controllers/quizz.controller.js";
const router = Router();
 router.route("/quiz").post(giveQuiz)
 router.route("/getQuiz").get(getQuizz)
 export default router;