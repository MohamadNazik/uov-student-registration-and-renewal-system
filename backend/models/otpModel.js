import mongoose from "mongoose";

const OTPVerificationSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

export default mongoose.model(
  "OTP",
  OTPVerificationSchema
);