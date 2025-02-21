import adminModel from "../../models/adminModel.js";
import userModel from "../../models/userModel.js";
import nodemailer from "nodemailer";
import otpModel from "../../models/otpModel.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { hashPassword } from "../../utils/hashPassword.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

const sendOTP = async (email, res) => {
  try {
    await otpModel.deleteMany({ email });

    const otp = crypto.randomInt(1000, 9999).toString();

    await otpModel.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It expires in 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: "Failed to send OTP" });
      }
      res.send({ message: "OTP sent successfully", status: "PENDING", email });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error sending OTP",
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    let user = await userModel.findOne({ "Address.Email": email });
    let admin = await adminModel.findOne({ email });

    if (!user && !admin) {
      return res.status(404).send({ message: "Email not found" });
    }

    sendOTP(email, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error sending OTP",
    });
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).send({ message: "OTP and email are required" });
    }

    const otpData = await otpModel.findOne({ email, otp });

    if (!otpData) {
      return res.status(404).send({ message: "Invalid OTP" });
    }

    if (new Date() > otpData.expiresAt) {
      await otpModel.deleteOne({ _id: otpData._id });
      return res.status(400).send({ message: "OTP has expired" });
    }

    await otpModel.deleteOne({ _id: otpData._id });
    let user = await userModel.findOne({ "Address.Email": email });
    let admin = await adminModel.findOne({ email });
    if (user) {
      await userModel.updateOne(
        { "Address.Email": email },
        { otp_verify: true }
      );
    } else if (admin) {
      await adminModel.updateOne({ email }, { otp_verify: true });
    }

    return res
      .status(200)
      .send({ message: "OTP verified successfully", email });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error verifying OTP",
    });
  }
};

export const resendOtpController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Please provide email",
      });
    }

    sendOTP(email, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error resending OTP",
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, conformPassword } = req.body;
    if (!email || !newPassword || !conformPassword) {
      return res.status(400).send({ message: "All fields are required" });
    } else {
      if (newPassword !== conformPassword) {
        return res.status(400).send({ message: "Passwords do not match" });
      } else {
        let user = await userModel.findOne({ "Address.Email": email });
        let admin = await adminModel.findOne({ email });

if (!user && !admin) {
          return res.status(404).send({ message: "User not found" });
        }

        if ((user && !user.otp_verify) || (admin && !admin.otp_verify)) {
          return res.status(400).send({
            message: "OTP verification required before resetting password",
          });
        } else {
          const hashedPassword = await hashPassword(newPassword);
          if (user) {
            await userModel.updateOne(
              { "Address.Email": email },
              { $set: { Password: hashedPassword, otp_verify: false } }
            );
          }
          if (admin) {
            await adminModel.updateOne(
              { email },
              { $set: { Password: hashedPassword, otp_verify: false } }
            );
          }

          await otpModel.deleteMany({ email });

          return res
            .status(200)
            .send({ message: "Password reset successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error resetting password",
    });
  }
};