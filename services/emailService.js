const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("email"),
    pass: config.get("password"),
  },
});

function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions);
}

exports.sendEmail = sendEmail;
