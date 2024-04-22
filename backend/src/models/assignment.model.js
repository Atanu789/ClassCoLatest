import mongoose,{Schema} from "mongoose";

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    className: {
      type:String,
      required: true,
    },
    subject:{
        type:String,
        required:true
    },
    teacherName: {
      type:String,
      required:true
    },
    guidelines: {
      type: String,
      required: true,
    },
    videoURL: String,
    pptUploadPath: String, 
    deadline: {
      type:String,
      required: true,
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
