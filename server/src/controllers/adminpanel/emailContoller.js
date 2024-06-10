const nodemailer = require('nodemailer');

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: email,
        pass: password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

const sendMail = ({ to, subject, text, html }) => {
    const mailOptions = {
        from: email,
        to,
        subject,
        text,
        html
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};


module.exports = { sendMail };