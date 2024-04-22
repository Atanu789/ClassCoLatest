import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    studentAvatar: {
      type: String,
      
    },
    instituteName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    grade: {
      type: Number,
    },
    permission: {
      type: Boolean,
      default: false,
    },
    rewards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reward",
      },
    ],
    quizParticipation: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
    assignmentsSolved: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOEKN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Student = mongoose.model("Student", studentSchema);
