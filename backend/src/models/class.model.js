import mongoose ,{Schema} from "mongoose"

const classSchema = new Schema({
    classname:{
        type:String,
        required:true
    },
    schedule:{
        type:Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    departments:{
        type:String,
        required:true
    },
    enrolledStudents:{
        type:Schema.Types.ObjectId,
        ref:["Student"]
    },
    enrolledTeachers:{
        type:Schema.Types.ObjectId,
        ref:["Student"]
    }
},{
    timestamps:true
})


export const  ClassModel = mongoose.model("Class",classSchema)