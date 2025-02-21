import express from "express";
import { forgotPasswordController, verifyOTPController } from "../../controllers/common/forgotPasswordController.js";

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
router.delete('/verify-otp',verifyOTPController);
export default router;
