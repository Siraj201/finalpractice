import express from 'express';
import mongoose from 'mongoose';
const app=express();
app.use(express.urlencoded({extended:true}));
import methodOverride from 'method-override';
app.use(methodOverride('_method'));
import ejsMate from 'ejs-mate'
app.set("view engine","ejs");
app.engine("ejs",ejsMate)
app.use(express.json())
import { user } from './models/user.js';
import session from 'express-session';
import flash from 'connect-flash'
import cookieParser from 'cookie-parser';
import listingRouter from "./routes/listings.js"
import reviewRouter from './routes/reviews.js';
import userRouter from './routes/user.js';
import passport from 'passport';
import localStrategy from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';
import { listing } from './models/listings.js';
import MongoStore from 'connect-mongo';
const options={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:new Date(Date.now()+7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(cookieParser())
app.use(session(options));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


let atlasurl = "mongodb+srv://siraj:JVB5qZINf4gv3LZy@cluster0.jmswx.mongodb.net/sirraj?retryWrites=true&w=majority";


main().then((res)=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    

  // let atlasurl='mongodb+srv://sirraj:JVB5qZINf4gv3LZy@<cluster-url>/sirraj?retryWrites=true&w=majority';

  //  let atlasurl="mongodb+srv://si:0kiJRC8MTzNn253B@cluster0.jmswx.mongodb.net/sis?retryWrites=true&w=majority";
    //const atlasurl= "mongodb+srv://sirraj:JVB5qZINf4gv3LZy@cluster0.jmswx.mongodb.net/listings?retryWrites=true&w=majority";
    await mongoose.connect(atlasurl);



}
const store=MongoStore.create({
    mongoUrl:atlasurl,
    crypto:{
        secret:"mysupersecretstring"
    },
    touchAfter:24*3600,
});
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
  next();
})
app.get("/listings/search",async(req,res)=>{
    let {search}=req.query;
    let alllistings=await listing.find({category:search});
    res.render("listings/home.ejs",{alllistings})
})
app.get("/",async(req,res)=>{
    let listings=await listing.find({});
    res.render("listings/home.ejs",{listings})
})
app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/listings/user",userRouter);

// app.get("*",(req,res)=>{
//     res.send("invalid request");
// })
app.use((err,req,res,next)=>{
    let {status=400,message="error message"}=err;
    res.render("listings/error.ejs",{status,message})
})
app.listen(3000,()=>{
    console.log("app is working using port 3000")
});
