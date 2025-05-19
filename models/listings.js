import mongoose from "mongoose";
const {Schema}=mongoose;
const listingSchema=new Schema({
    title:String,
    description:String,
    image:String,
    price:Number,
    country:String,
    location:String,
    review:[{
        type:Schema.Types.ObjectId,
        ref:"review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    category:{
        type:String,
        enum:["mountains","pools","castles","deserts","arctic-region"],
        required:true
    }
});
const listing=mongoose.model("listing",listingSchema);
export {listing}