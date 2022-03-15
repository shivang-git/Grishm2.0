const env = require('dotenv').config({ path: '../.env' })
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const flash = require('connect-flash')
const authroute = require('../routes/auth-route')
const router = require('../routes/router')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const hbs = require('hbs')
require('../configure/passport-setup')
const cookiesession = require('cookie-session')
const session = require('express-session')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const database_link = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.29gsz.mongodb.net/user?retryWrites=true&w=majority`
const mongoose = require("mongoose");


mongoose.connect(database_link)


const staticpath = path.join(__dirname, '../public')

app.use(cookieparser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(express.static(staticpath))

app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});

app.use(cookiesession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["mynameisshivang"]
}))

// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

app.use(passport.initialize());
app.use(passport.session())

app.use('/weather', (req, res, next) => {
    let cok = req.cookies._loggedin
    if (cok) {
        let isverified = jwt.verify(cok, process.env.SECRET_KEY)
        if (isverified) {
            next()

        } else {
            return res.redirect('/auth/login')
        }
    } else if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
})

app.use(flash())
    //     app.use(function(req, res, next) {
    //         res.locals.message = req.flash();
    //         next();
    //     });


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

app.use('/auth', authroute);
app.use('/', router)

app.get('*', (req, res) => {
    res.status(404).render('404')
})



app.listen(port)