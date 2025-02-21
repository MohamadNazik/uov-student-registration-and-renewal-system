import express from "express";
import { forgotPasswordController, resendOtpController, verifyOTPController } from "../../controllers/common/forgotPasswordController.js";

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
router.post('/verify-otp',verifyOTPController);
router.post('/resend-otp',resendOtpController)
export default router;
