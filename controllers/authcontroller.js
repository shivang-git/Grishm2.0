const register_detail = require('../models/registerModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')



//for register page
function register(req, res) {
    let cok = req.cookies._loggedin
    let oauthcookie = req.user
    if (cok) {
        let isverified = jwt.verify(req.cookies._loggedin, process.env.SECRET_KEY)
        if (isverified) {
            res.redirect('/weather')
        }
    }
    if (oauthcookie) {
        res.redirect('/weather')
    }

    res.render('register', {
        message: req.flash('error'),
        // existuser: req.flash('userexist'),
        passuser: req.flash('pass'),
        usersuccess: req.flash('success')

    })
}


async function register_info(req, res) {
    try {
        const mail = req.body.email
        const password = req.body.password
        const cpassword = req.body.confirmpassword
        const user = await register_detail.findOne({ email: mail })

        if (password === cpassword) {
            const userregister = new register_detail(req.body)
            userregister.save()
            req.flash('success', 'user registration successfull');
            res.redirect('/auth/register')
        } else {
            req.flash('pass', 'Confirm password not matching');
            res.redirect('/auth/register')
        }
    } catch (error) {
        // req.flash('error', 'User Registration Failed');
        // res.redirect('/auth/register')
        console.log(error);

    }



}

//for login page
function login(req, res) {
    let cok = req.cookies._loggedin
    if (cok) {
        let isverified = jwt.verify(req.cookies._loggedin, process.env.SECRET_KEY)
        if (isverified) {
            res.redirect('/weather')
        }
    }
    let oauthcookie = req.user
    if (oauthcookie) {
        res.redirect('/weather')
    }

    res.render('login', {
        message: req.flash('error'),
        loggedout: req.flash('logout')
    })

}

async function login_info(req, res) {
    try {
        const mail = req.body.email
        const password = req.body.password

        const user = await register_detail.findOne({ email: mail })

        let passmatch = await bcrypt.compare(password, user.password)
        if (passmatch) {
            const token = jwt.sign({ payload: user._id }, process.env.SECRET_KEY, { expiresIn: '2 days' })

            res.cookie('_loggedin', token, { httpOnly: true })
            req.flash('success', 'user login successful')
            res.redirect('/weather')

        } else {
            req.flash('error', 'Invalid Credentials');
            res.redirect('/auth/login')
        }
    } catch (error) {
        req.flash('error', 'Invalid Credentials');
        res.redirect('/auth/login')
    }
}

function redirect(req, res) {
    req.flash('loginuser', 'user login successful')
    res.redirect('/weather')
}



function logout(req, res) {
    // res.cookie('_loggedin', '', { expires: new Date(1), path: '/' });
    if (req.cookies._loggedin) {
        res.clearCookie('_loggedin', );
        res.clearCookie('_loggedin', false, { maxAge: 0 });
        req.flash('logout', 'logout successful')
        res.redirect('/auth/login')
    } else if (req.user) {
        req.flash('logout', 'logout successful')
        req.logout()
        res.redirect('/auth/login')
    }
}





module.exports = {
    register,
    register_info,
    login,
    login_info,
    logout,
    redirect



}