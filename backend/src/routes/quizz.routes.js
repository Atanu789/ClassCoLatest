import { Router } from "express";
import { getQuizz, giveQuiz,getQuizzesGroupedByDate } from "../controllers/quizz.controller.js";
const router = Router();
 router.route("/quiz").post(giveQuiz)
 router.route("/getQuiz").get(getQuizz)
 router.route("/previewQuiz").get(getQuizzesGroupedByDate);
 export default router;