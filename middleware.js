import { listing } from "./models/listings.js";
const isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listings=await listing.findById(id).populate("owner");
    if(!req.user._id.equals(listings.owner._id)){
        req.flash("error","you are not owner of the listing")
        return res.redirect("/listings")
    }
    next();
}

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged in first")
        return res.redirect("/listings/user/login")
    }
    next();
}
export {isOwner,isLoggedIn}