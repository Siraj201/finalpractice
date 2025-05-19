
import express from 'express';
const app=express();
import { listing } from '../models/listings.js';
import { ExpressError } from '../models/ExpressError.js';
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const router=express.Router({mergeParams:true});
import { review } from '../models/reviews.js';

const createreview=async(req,res)=>{
    let {id}=req.params;
    let listings=await listing.findById(id);
    console.log(listings);
    let newreview=new review(req.body.review);
    console.log(newreview)
    await newreview.save();
    listings.review.push(newreview);
    await listings.save();
    req.flash("success","review created")
    res.redirect(`/listings/${id}`);
}

const editreview=async(req,res)=>{
    let {id,reviewid}=req.params;
    console.log("request recieved edit review")
    let listings=await listing.findById(id);
    let reviews=await review.findById(reviewid);
    console.log(listings,reviews)
    res.render("listings/editreview.ejs",{reviews,listings});
}

const updatereview=async(req,res)=>{
    let {id,reviewid}=req.params;
    let reviews=await review.findByIdAndUpdate(reviewid,req.body.review)
    req.flash("success","review updated")
    res.redirect(`/listings/${id}`);
}

const deletereview=async(req,res)=>{
    let {id,reviewid}=req.params;
   let reviews= await review.findByIdAndDelete(reviewid);
    if(!reviews){
        next(new ExpressError(404,"review does not exist"))
    }
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewid}})
    req.flash("success","review deleted")
    res.redirect(`/listings/${id}`);
}

export {createreview,editreview,updatereview,deletereview};