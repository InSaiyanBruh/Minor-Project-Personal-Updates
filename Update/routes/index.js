const express = require('express');
const router = express.Router();
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

let otpStore = {}; // temporary in-memory store
let transporter = null; // email transporter

// Generate OTP
function generateOTP() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
}

// Configure Ethereal email
nodemailer.createTestAccount().then((account) => {
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
  console.log("✅ Ethereal test account:", account.user, account.pass);
});

// Show login page
router.get('/', function (req, res) {
  if (req.session.isLoggedIn) {
    return res.redirect('/home');
  }

  res.render('index', {
    title: 'OTP Login',
    message: null,
    showOtpInput: false,
    email: null,
  });
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!transporter) {
    return res.render('index', {
      title: 'OTP Login',
      message: 'Email service not ready. Try again later.',
      showOtpInput: false,
      email: null,
    });
  }

  const otp = generateOTP();

  try {
    const info = await transporter.sendMail({
      from: '"MyApp" <no-reply@example.com>',
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
    });

    otpStore[email] = otp;

    console.log("OTP for demo:", otp);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    res.render('index', {
      title: 'OTP Login',
      message: "OTP sent successfully ✅",
      showOtpInput: true,
      email,
    });
  } catch (error) {
    console.error(error);
    res.render('index', {
      title: 'OTP Login',
      message: "Failed to send OTP ❌",
      showOtpInput: false,
      email: null,
    });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];

    req.session.isLoggedIn = true;
    req.session.userEmail = email;

    return res.redirect('/home');
  }

  res.render('index', {
    title: 'OTP Login',
    message: "❌ Invalid OTP, please try again.",
    showOtpInput: true,
    email,
  });
});

// Protected home route
router.get('/home', (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/');
  }

  res.render('home', {
    email: req.session.userEmail,
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
