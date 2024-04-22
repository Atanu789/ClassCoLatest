import { Router } from "express";
import { getAssignments, giveAssignment} from "../controllers/assignment.controller.js";
 const router = Router();
 router.route("/assignments").post(giveAssignment)
 router.route("/getAssignments").get(getAssignments)

 export default router;