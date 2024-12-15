import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(email, content) {
  // send mail with defined transport object
  console.log(process.env.USER_EMAIL, process.env.USER_PASS);
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL, // sender address
    to: "minefc1989@email", // list of receivers
    // sendgrid,...
    subject: "Chào mừng đến với hệ thống của chúng tôi", // Subject line
    text: content, // plain text body
    html: `<div>
    <h1 style="font-size:50px; color: "red";">Welcome</h1>
    </div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
sendMail().catch(console.error);
