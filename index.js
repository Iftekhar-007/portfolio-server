const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// console.log(process.env.GMAIL_NAME);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Create reusable transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_NAME,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, // sender address (visitor’s email)
    to: process.env.GMAIL_NAME, // your Gmail to receive
    subject: `New Contact from Portfolio: ${name}`,
    text: message + "\n\nFrom: " + email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.get("/", (req, res) => {
  res.send("server running 5000");
});

app.listen(port, () => {
  console.log("server running on 5000");
});
