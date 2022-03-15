const validator = require('validator')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


const register_schema = new mongoose.Schema({
    "username": String,
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

    },
    confirmpassword: {
        type: String,
        required: true,

    }

})


register_schema.pre('save', async function() {
    let salt = 10
    let pass = this.password
    let hashpass = await bcrypt.hash(pass, salt)
    this.password = hashpass
    this.confirmpassword = undefined;

})

const register_detail = new mongoose.model('register_detail', register_schema)




module.exports = register_detail