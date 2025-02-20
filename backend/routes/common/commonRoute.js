import express from "express";
import { forgotPasswordController } from "../../controllers/common/forgotPasswordController";

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
export default router;
