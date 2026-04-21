import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:String,
    roomId:String
},{timestamps:true}
);

export default mongoose.model("Chat",chatSchema);
