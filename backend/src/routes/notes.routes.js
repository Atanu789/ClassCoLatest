import { Router } from "express";
import { createNotes, deleteNotes, editNotes } from "../controllers/notes.controller.js"

 const router = Router();

  router.route("/notes").post(createNotes)
  router.route("/delete").delete(deleteNotes)
  router.route("/edit").post(editNotes)
 export default router;