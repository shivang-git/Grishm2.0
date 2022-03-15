const express = require("express")
const authroute = express.Router()
const passport = require('passport')

const {
    register,
    register_info,
    login,
    login_info,
    logout,
    redirect
} = require('../controllers/authcontroller')


authroute
    .route('/register')
    .get(register)
    .post(register_info)

authroute
    .route('/login')
    .get(login)
    .post(login_info)

authroute
    .route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile']
    }))

authroute
    .route('/google/redirect')
    .get(passport.authenticate('google', {
        successRedirect: '/weather',
        failureRedirect: '/auth/login'
    }), redirect)

authroute.route('/logout')
    .get(logout)





module.exports = authroute