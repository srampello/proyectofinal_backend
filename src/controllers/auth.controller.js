import User from '../models/user.model.js'
import passport from 'passport'
import userModel from '../models/user.model.js'

export const renderRegisterForm = (req, res) => res.render('register')
export const renderSigninForm = (req, res) => res.render("login");

export const register = async (req, res) => {
    const errors = []
    const {username, email, password, confirm_password} = req.body
    if(password !== confirm_password){
        errors.push({text: 'Passwords dont match'})
    }
    if(password.length < 8){
        errors.push({text: 'Passwords must be at least 8 characters'})
    }
    
    if(errors.length > 0){
        res.render('register', {
            errors,
            username,
            email,
            password,
            confirm_password
        })
    }else{
        const emailUser = await userModel.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'The email is already in use')
            res.redirect('/api/auth/register')
        }else{
            const newUser = new User({username, email, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'You are registered')
            res.redirect('/api/auth/login')
        }
    }
}

export const login = passport.authenticate('login', {
    failureRedirect: "/api/auth/login",
    successRedirect: "/",
    failureFlash: true
});

export const logout = async (req, res, next) => {
    await req.logout((err) => {
      if (err) return next(err);
      req.flash("success_msg", "You are logged out now.");
      res.redirect("/");
    });
  };

export const forgotPass = async(req, res, next) => {
    //* get user based
    const {email} = req.body
    const user = await userModel.findOne({email: email})
    if(!user){
        req.flash('error_msg', 'There is no account created with that email')
        res.redirect('/api/auth/forgotpass')
    }
    //* generate random reset token
}

export const resetPass = async (req, res, next) => {

}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}
