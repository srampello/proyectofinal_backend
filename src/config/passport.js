import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import userModel from "../models/user.model.js";

passport.use('login', new LocalStrategy({
  usernameField: "email",
}, async (email, password, done) => {
  //* Match email user
  const user = await userModel.findOne({email})
  if(!user){
    //return done(null, false,  req.flash('error_msg', 'The email is already in use'))
    return done(null, false,  { message: "Not User found." })
  }else{
    // Match Password's User
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return done(null, false,  { message: "Incorrect Password" });
    
    return done(null, user);
  }
}))

passport.serializeUser(function(user, done){
  done(null, user._id); 
})

passport.deserializeUser(async (id, done) =>{
  let user = await userModel.findById(id)
  done(null, user);
});
