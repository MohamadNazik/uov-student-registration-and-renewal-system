import express from "express";
import { forgotPasswordController, resendOtpController,verifyOTPController,resetPasswordController } from "../../controllers/common/forgotPasswordController.js";

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
router.post('/verify-otp',verifyOTPController);
router.post('/resend-otp',resendOtpController);
router.post('/reset-password',resetPasswordController);

export default router;