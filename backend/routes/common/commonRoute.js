import express from "express";
import { forgotPasswordController, resendOtpController,verifyOTPController,resetPasswordController } from "../../controllers/common/forgotPasswordController.js";
import { checkRegistrationAvailabilityController } from "../../controllers/common/checkRegistrationAvailabilityController.js";

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
router.post('/verify-otp',verifyOTPController);
router.post('/resend-otp',resendOtpController);
router.post('/reset-password',resetPasswordController);

router.post('/registration-available',checkRegistrationAvailabilityController);

export default router;