import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Teacher.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
const registerTeacher = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, teacherId, instituteName } =
    req.body;

  if (
    [fullName, email, username, password, teacherId].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedTeacher = await Teacher.findOne({
    $or: [{ username }, { email }, { teacherId }],
  });
  if (existedTeacher) {
    throw new ApiError(409, "Teacher with email,username or ID already exists");
  }

//   const teacherAvatarLocalPath = req.files?.avatar[0]?.path;

//   if (!teacherAvatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required");
//   }
//   const teacherAvatar = await uploadOnCloudinary(teacherAvatarLocalPath);

//   if (!teacherAvatar) {
//     throw new ApiError(400, "Avatar file is required");
//   }

  const teacherUser = await Teacher.create({
    fullName,
    // teacherAvatar: teacherAvatar.url,
    email,
    password,
    username: username.toLowerCase(),
    teacherId,
    instituteName,
  });

  const createdTeacherUser = await Teacher.findById(teacherUser._id).select(
    "-password -refreshToken"
  );
  if (!createdTeacherUser) {
    throw new ApiError(400, "Error while registering Teacher in database");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, teacherUser, "Teacher registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await Teacher.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "Teacher does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid teacher credentials");
  }
  console.log(user._id);
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await Teacher.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
    })
    .cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Teacher logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await Teacher.findByIdAndUpdate(
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

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Teacher logged out successfully"));
});

export { registerTeacher, loginUser, logoutUser };
