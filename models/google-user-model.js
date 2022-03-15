const mongoose = require("mongoose");



const user_schema = new mongoose.Schema({
    "username": String,
    'googleId': String,
    'profilephoto': String

})

const user_detail = new mongoose.model('user_detail', user_schema)


module.exports = user_detail