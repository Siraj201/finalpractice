
import express from 'express';
const app=express();
import { listing } from '../models/listings.js';
import { review } from '../models/reviews.js';
const router=express.Router({mergeParams:true});
import { ExpressError } from '../models/ExpressError.js';

import { user } from '../models/user.js';
app.use(express.urlencoded({extended:true}))
app.use(express.json());
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
const mapboxToken ='pk.eyJ1Ijoic2lyYWp1ZGRpbnlvdXNmIiwiYSI6ImNtNDB5aG0xeDA1OHQya3F3dnp2ZTdycXoifQ.d1fRlgaa2-u-87t7OILICg';
const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });



const getall=async(req,res)=>{
    let alllistings=await listing.find({}).populate("owner");
    res.render("listings/home.ejs",{alllistings});
   
}

const createnew=async(req,res)=>{

    console.log("create new workking");
    let response=await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit:1
    }).send();
    let {title,image,description,location,country,category}=req.body.listing;
        let newlisting=new listing({
        title:title,
        image:image,
        description:description,
        location:location,
        country:country,
        category:category
        })

    // let newlisting = new si(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.geometry=response.body.features[0].geometry;
    // newlisting.image={url,filename};
    let savedListing=await newlisting.save();
    console.log(savedListing);
    req.flash("success","new listing created");
    res.redirect("/listings");
}

const showone=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id).populate("review").populate("owner");
    if(!list){
        next(new ExpressError(404,"listing you are looking for does not exist"))
    }
    res.render("listings/show.ejs",{list});
}

const editone=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    res.render("listings/edit.ejs",{list});
}

const updateone=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
    // await list.save();
    console.log("updated");
    req.flash("success","listing updated")
    res.redirect("/listings");
}

const deleteone=async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    let list=await listing.findByIdAndDelete(id);
    console.log(list)
    req.flash("success","listing deleted")
    res.redirect("/listings");
}
export {getall,createnew,showone,editone,updateone,deleteone};