import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
      type: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
      trim: true,
    },
    givePermissions: {
      type:Boolean,
      default: false
    },
    instituteName:{
        type:String,
        required:true
    },
    instituteId:{
        type:String,
        required:true
    },
    allowedStudents:[{
        type:Schema.Types.ObjectId,
        ref:"Student"
    }]
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
