import adminModel from "../../models/adminModel.js";
import userModel from "../../models/userModel.js";
import nodemailer from "nodemailer";

import otpModel from "../../models/otpModel.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send({ message: "Email is required" });

  let user = await userModel.findOne({ "Address.Email": email });
  let admin = await adminModel.findOne({ email });

  if (!user && !admin) {
    return res.status(404).send({ message: "Email not found" });
  }

  const otp = crypto.randomInt(1000, 9999).toString();

  await otpModel.create({ email, otp,expiresAt: new Date(Date.now() + 5 * 60 * 1000) });

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Failed to send OTP" });
    }
    res.send({ message: "OTP sent successfully", status: "PENDING", email });
  });
};
