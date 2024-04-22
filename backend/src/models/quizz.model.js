import mongoose , {Schema} from "mongoose"
const quizzSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    option1: {
      type: String,
      required: true,
    },
    option2: {
      type:String,
      required: true,
    },
    option3:{
        type:String,
        required:true
    },
    
    option4: {
      type: String,
      required: true,
    },
     answer: {
      type:String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Quizz = mongoose.model("Quizz", quizzSchema);
