const passport = require('passport')
const Googlestrategy = require('passport-google-oauth20').Strategy;
const user_detail = require('../models/google-user-model')

fields = {
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
}




passport.use(new Googlestrategy(fields,
    async(accessToken, refreshToken, profile, done) => {

        const newUser = {
            username: profile.displayName,
            googleId: profile.id,
            displaypicture: profile._json.picture
        }
        try {
            let user = await user_detail.findOne({ googleId: profile.id })
            if (user) {
                done(null, user)

            } else {
                user = await user_detail.create(newUser)
                console.log(newUser);
            }
        } catch (error) {
            console.error(error);

        }

    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    user_detail.findById(id).then((user) => {
        done(null, user)
    })

})
module.exports = user_detail