const nodemailer = require('nodemailer')
const sendmail = async(username, email, subject, message, cb) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ionos.com",
        port: 587,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASS,
        }

    });


    // send mail with defined transport object
    let mailOption = {
        from: { name: `${username}`, address: `${email}` }, // sender address
        to: "mail.suport13@gmail.com", // list of receivers
        subject: `${subject}`, // Subject line
        html: `<p>Name: ${username}</p>
       <p>Email: ${email}</p>
       <p>Subject: ${subject}</p>
       <p>Message: ${message}</p>`, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            cb(err, null)
        } else {
            cb(null, info)

        }
    })
}
module.exports = sendmail