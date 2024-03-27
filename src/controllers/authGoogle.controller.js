import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "dotenv";
config({path: process.ENV})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback",
    passReqToCallback: true
}, function(req, accesToken, refreshToken, profile, done){
    done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})