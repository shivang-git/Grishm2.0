const validator = require('validator')
const mongoose = require("mongoose");



const login_schema = new mongoose.Schema({
    'email': {
        type: String,
        required: true,
        unique: true,
        // using npm validator 
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("invalid email")
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },


})



const login_detail = new mongoose.model('login_detail', login_schema)




module.exports = login_detail