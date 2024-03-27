export const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error_msg", "Not Authorized")
    res.redirect('/api/auth/login')
}

export const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}