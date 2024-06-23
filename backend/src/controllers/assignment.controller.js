import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js"
import { Assignment } from "../models/assignment.model.js";
import { request } from "express";
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
const upload = multer({ dest: 'uploads/' });

const giveAssignment = asyncHandler(async (req, res) => {
  const { title, description, className, subject, teacherName, guidelines, deadline } = req.body;
  console.log(title)
  if (
    [title, description, className, subject, teacherName, guidelines, deadline].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const assignment = await Assignment.create({
    title,
    description,
    teacherName,
    subject: subject.toLowerCase(),
    className,
    guidelines,
    deadline

  })
  const createdAssignment = await Assignment.findById(assignment._id)

  if (!createdAssignment) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdAssignment, "Assignment created Successfully"));

});

const getAssignments = asyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find();
    if (!assignments) {
      throw new ApiError(400, "error while fetching Assignments")
    }
    return res
      .status(200)
      .json(new ApiResponse(200, assignments, "Assignments fetch successfully"))
  } catch (error) {
    throw new ApiError(400, `Can't fetch assignment from mongodb ${error}`)
  }
})


const solAssign = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const solAssign = await Assignment.findById(id);
  if (req.file) {
    console.log(req.file.secure_url);
    const url = req.file.path;
    solAssign.solution = [...solAssign.solution, url];
    await solAssign.save();
  }
  return res
    .status(201)
    .json({ massage: "Assignment Submitted successfully", data: req.file.path });

});


const solAssignVid = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const filePath = req.file.path;
  const solAssignVid = await Assignment.findById(id);
  try {
    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      folder: 'videoSolutions',
    });
    fs.unlinkSync(filePath);
    solAssignVid.vidSolution = [...solAssignVid.vidSolution, result.secure_url];
    await solAssignVid.save();
    // Send the Cloudinary URL in the response
    res.status(200).json({ message: 'Video uploaded successfully', url: result.secure_url });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  }

});
// const pptLocalPath = req.files?.pptUpload[0]?.path;
// if(!pptLocalPath){
//   throw new ApiError(400, "ppt file is required");
// }
// const ppt = await uploadOnCloudinary(pptLocalPath);

//   if (!ppt) {
//     throw new ApiError(400, "ppt file is required2");
//   }

//   const assignment = await Assignment.create({
//     pptUploadPath: ppt.url
//   })
//   return res
//     .status(201)
//     .json(new ApiResponse(200, assignment, "ppt registered Successfully"));

export {
  giveAssignment,
  getAssignments,
  solAssign,
  solAssignVid
  // submitAssignments
}