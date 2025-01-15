import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "d9ecf94c918ef06539e380c115c364e9",
  },
});

export default transporter;
