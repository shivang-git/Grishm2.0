const express = require("express")
const router = express.Router()

const {
    index,
    weather,
    about,
    contact,
    contactinfo,
    profile
} = require('../controllers/routercontroller')


router.route('/')
    .get(index)

router.route('/home')
    .get(index)

router.route('/weather')
    .get(weather)


router.route('/about')
    .get(about)

router.route('/contact')
    .get(contact)
    .post(contactinfo)




// router.route('/user/profile')
//     .get(profile)

module.exports = router