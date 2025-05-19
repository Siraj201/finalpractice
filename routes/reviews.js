import express from 'express';
const app=express();
const router=express.Router({mergeParams:true});
import { ExpressError } from '../models/ExpressError.js';
import { listing } from '../models/listings.js';
import { review } from '../models/reviews.js';
import { createreview,editreview,updatereview,deletereview } from '../controllers/reviews.js';


const wrapAsync=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err);
        })
    }
}

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error");
    // res.locals.currUser=req.user();
  next();
})
import { validatereview } from '../schema.js';
const validatereviews=(req,res,next)=>{
    console.log("validate review")
    let {error}=validatereview.validate(req.body);
    if(error){
        let errMsgs=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(404,errMsgs)
    }
    else{
        next();
    }
}


router.post("/",validatereviews,wrapAsync(createreview))
router.get("/:reviewid",wrapAsync(editreview))
router.patch("/:reviewid",validatereviews,wrapAsync(updatereview))
router.delete("/:reviewid",wrapAsync(deletereview))


export default router;