import { Router } from "express";
import { getAssignments, giveAssignment, solAssign,solAssignVid } from "../controllers/assignment.controller.js";
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { storage} from "../cloudConfig.js";
const upload = multer({ storage });
const videoUpload = multer({ dest: 'uploads/' });
const router = Router();
router.route("/assignments").post(giveAssignment)
router.route("/getAssignments").get(getAssignments)
router.route("/solAssign").post(upload.single('file'),solAssign)
router.route("/solAssignVid").post(videoUpload.single('video'),solAssignVid)
export default router;