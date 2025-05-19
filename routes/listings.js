import express from 'express';
const app=express();
const router=express.Router({mergeParams:true});
import { ExpressError } from '../models/ExpressError.js';

import { isOwner,isLoggedIn } from '../middleware.js';
import {getall,createnew,showone,editone,updateone,deleteone} from '../controllers/listings.js'

// import { parser } from '../cloudConfig.js';
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

import { validateschema } from '../schema.js';
const validatelisting=(req,res,next)=>{
   let {error}= validateschema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg)
    }
    else{
        next();
    }
}



router.get("/",wrapAsync(getall))
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
})
router.post("/new", isLoggedIn,validatelisting,wrapAsync(createnew));

router.get("/:id",isLoggedIn,wrapAsync(showone))
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(editone))
router.patch("/:id",isLoggedIn,isOwner,validatelisting,wrapAsync(updateone))
router.delete("/:id/delete",isLoggedIn,isOwner,wrapAsync(deleteone))

export default router;