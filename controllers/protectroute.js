// const jwt = require('jsonwebtoken')
// const secret_key = '80fd84ebe88738811b22ab3372c53b383f8ac3cdab92205a096ac393cb03b1b7c7d7721655191dc6d6def80d9e0efe52100a52f057e28c72f5185370'


// var cook;

// let authchecking = (req, res) => {
//     cook = req.cookies._loggedin
//     let auth = req.user
//     if (cook) {
//         jwtauthcheck()
//     }
// }
// console.log(cook);

// function jwtauthcheck(req, res, next) {
//     let cok = req.cookies._loggedin
//     if (cok) {
//         console.log("work");
//         let isverified = jwt.verify(cook, secret_key)
//         if (isverified) {
//             next()

//         } else {
//             return res.redirect('/auth/login')
//         }

//     } else {
//         return res.redirect('/auth/login')
//     }


// }


// function googleauthcheck(req, res, next) {
//     if (!req.user) {
//         res.redirect('/auth/login')
//     } else {
//         next()
//     }
// }

// var authchecking = async function(req, res, next) {
//     let cok = req.cookies._loggedin
//     if (cok) {
//         let isverified = await jwt.verify(cok, secret_key)
//         if (isverified) {
//             next()
//         } else {
//             return res.redirect('/auth/login')
//         }
//     }
//     if (!req.user) {
//         res.redirect('/auth/login')
//     } else {
//         next()
//     }
// }



// module.exports = {
//     authchecking
// }