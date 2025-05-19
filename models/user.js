import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
const {schema}=mongoose;
const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
})
userSchema.plugin(passportLocalMongoose);
const user=mongoose.model("user",userSchema);
export {user};