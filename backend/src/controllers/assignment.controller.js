import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Teacher} from "../models/teacher.model.js"
import { Assignment } from "../models/assignment.model.js";


const giveAssignment = asyncHandler(async(req,res)=>{
    const {title , description , className,subject,teacherName,guidelines,deadline} = req.body;
    console.log(title)
    if (
    [title, description, className, subject,teacherName,guidelines,deadline].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const assignment = await Assignment.create({
    title,
    description,
    teacherName,
    subject:subject.toLowerCase(),
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

const getAssignments = asyncHandler(async (req,res)=>{
  try {
    const assignments = await Assignment.find();
    if(!assignments){
      throw new ApiError(400,"error while fetching Assignments")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,assignments,"Assignments fetch successfully"))
  } catch (error) {
    throw new ApiError(400 , `Can't fetch assignment from mongodb ${error}`)
  }
})

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
    // submitAssignments
}