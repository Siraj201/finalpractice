import express from 'express';
const app=express();
const router=express.Router({mergeParams:true});
app.use(express.urlencoded({extended:true}));
import { ExpressError } from '../models/ExpressError.js';
import { listing } from '../models/listings.js';
import { review } from '../models/reviews.js';
import { user } from '../models/user.js';
import passport from 'passport';
import localStrategy from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';

const wrapAsync=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err);
        })
    }
}

router.get("/signup",(req,res)=>{
    res.render("listings/signup.ejs")
})
// router.post("/signup",async(req,res)=>{
//     let {username,email,password}=req.body;
//     let newuser=new user({username,email
//     })
//    let registereduser= await user.register({newuser,password});
//     req.login(registereduser,(err)=>{
//         if(err){
//             return next(err);
//         }
//         req.flash("sucess","welcome to wanderlust");
//         res.redirect("/listings");
//     })
   
    
// })

router.post("/signup", async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new user({ username, email });
      const registeredUser = await user.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  });
  
router.get("/login",(req,res)=>{
    res.render("listings/login.ejs")
})

router.post("/signup",async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newuser=new user({
            username,email
        });
        let registereduser=await user.register(newuser,password);
        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listings")
        })
    }
        catch(err){
            console.log(err);
            req.flash("error","some error");
        res.redirect("/listings/user/signup")
        }
    
})
// router.post("/login",passport.authenticate('local',{failureRedirect:"/listings/user/login",failureFlash:true},
// async(req,res)=>{
//     // req.flash("success","welcome back to wanderls
//     res.redirect("/listings");
// }))
router.post("/login", passport.authenticate('local', {
    failureRedirect: "/listings/user/login",
    failureFlash: true
  }), (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    res.redirect("/listings");
  });
  router.get("/logout",async(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings")
    })
  })
  
export default router;