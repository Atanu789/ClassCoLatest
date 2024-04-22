import mongoose , {Schema} from "mongoose"

const scheduleSchema = new Schema({
    classname:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
},{
    timestamps:true
});



export const Schedule = mongoose.model("Schedule",scheduleSchema)