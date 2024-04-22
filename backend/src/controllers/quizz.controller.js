import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Teacher} from "../models/teacher.model.js"
import { Quizz } from "../models/quizz.model.js";


const giveQuiz = asyncHandler(async(req,res)=>{
    const {question,option1,option2,option3,option4,answer} = req.body;
   
    if (
    [question,option1,option2,option3,option4,answer].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const quizz = await Quizz.create({
    question,
    option1,
    option2,
    option3,
    option4,
    answer

  })
  const createdQuizz = await Quizz.findById(quizz._id)

  if (!createdQuizz) {
    throw new ApiError(500, "Something went wrong while registering the quizz");
  }
    return res
    .status(201)
    .json(new ApiResponse(200, createdQuizz, "Quizz created Successfully"));

});

const getQuizz = asyncHandler(async (req,res)=>{
  try {
    const quizzes = await Quizz.find();
    if(!quizzes){
      throw new ApiError(400,"error while fetching Quiz")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,quizzes,"Quiz fetch successfully"))
  } catch (error) {
    throw new ApiError(400 , `Can't fetch quiz from mongodb ${error}`)
  }
})

export {
    giveQuiz,
    getQuizz
}