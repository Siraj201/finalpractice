
import mongoose from "mongoose";
const Schema=mongoose.Schema;
const reviewSchema=new Schema({
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
});
const review=mongoose.model("review",reviewSchema);
export {review};