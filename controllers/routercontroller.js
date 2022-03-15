const express = require('express')
const user_detail = require('../configure/passport-setup')

const sendmail = require('../configure/sendmail')

function index(req, res) {
    res.render('index', {
        user: req.user,
        userjwt: req.cookies._loggedin
    })

}

function weather(req, res) {
    res.render('weather', {
        success: req.flash('success'),
        login: req.flash('loginuser')
    })
}

function about(req, res) {
    res.render('about', {
        user: req.user,
        userjwt: req.cookies._loggedin
    })
}

function contact(req, res) {
    // console.log(res.locals.user);
    // res.locals.messages = req.flash();
    res.render('contact', {
        user: req.user,
        userjwt: req.cookies._loggedin,
        sent: req.flash('emailsent')
            // messages: res.locals.user
    })
}

function contactinfo(req, res) {
    const { username, email, subject, message } = req.body
    sendmail(username, email, subject, message)
    req.flash('emailsent', 'Successfully sent email');
    res.redirect('/contact')



}

function profile(req, res) {
    res.render('profile_page', {
        user: req.user,
        userjwt: req.cookies._loggedin
    })
}

module.exports = {
    index,
    weather,
    about,
    contact,
    contactinfo,
    profile

}