import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Student.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};
const registerStudent = asyncHandler(async (req, res) => {
  console.log(req.file);
  const { fullName, email, username, password, studentId, instituteName } =
    req.body;

  if (
    [fullName, email, username, password, studentId].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedStudent = await Student.findOne({
    $or: [{ username }, { email }, { studentId }],
  });
  if (existedStudent) {
    throw new ApiError(
      409,
      "Student with email, username, or ID already exists",
    );
  }

  

  const studentUser = await Student.create({
    fullName,
   
    email,
    password,
    username: username,
    studentId,
    instituteName,
  });
  if(req.file){
    const currStudent= await Student.findById(studentUser._id);
    console.log(req.file.path);
    currStudent.dp=req.file.path;
    currStudent.save();
  }
  const createdStudentUser = await Student.findById(studentUser._id).select(
    "-password ",
  );
  if (!createdStudentUser) {
    throw new ApiError(400, "Error while registering Student in database");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { studentUser, _id: studentUser._id },
        "Student registered Successfully",
      ),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  // req.body -> user
  // username or email
  // find the user
  // match password
  // access and refresh token
  // send cookie

  const { username, email, password } = req.body;

  console.log("Username:", username);
  console.log("Email:", email);

  if ((!(username ||email))) {
      console.log("Invalid input");
      throw new ApiError(400, "Please provide either username or email, not both");
  }

  const user = await Student.findOne({
      $or: [{ username }, { email }]
  });

  if (!user) {
      console.log("User not found");
      throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
      console.log("Incorrect password");
      throw new ApiError(400, "Incorrect password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
  const loggedInUser = await Student.findById(user._id).select("-password ");

  const options = {
      httpOnly: true,
      secure: true
  };
  console.log(req.cookies);
  console.log("accessToken",accessToken);
  console.log("refreshToken",refreshToken);

  return res.status(200)
  
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
          new ApiResponse(
              {
                  user: loggedInUser,
                  accessToken,
                  refreshToken
              },
              "User logged in Successfully"
          )
      );
});


 const logoutUser = asyncHandler(async (req, res) => {
  // Remove refreshToken from the database
  await Student.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1,
          },
      },
      {
          new: true,
      }
  );
  console.log(req.user._id);

  // Clear cookies
  const options = {
      httpOnly: true,
      secure: true,
  };

  res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);

  // Send response
  return res.status(200).json({
      success: true,
      message: "Student logged out successfully",
  });
});

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Student.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user, "User found successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
        ),
      );
  }
};
const findStudentByUsername = asyncHandler(async (req, res) => {
  const { userName } = req.params;
  try {
    const student = await Student.findOne({ username:userName });
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, student, "Student found successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
        ),
      );
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res
    .status(200)
    .json(new ApiResponse(200, students, "All students fetched successfully"));
});



export {
  registerStudent,
  loginUser,
  logoutUser,
  findUser,
  getAllStudents,
  findStudentByUsername,
};
