import express from "express";
import { uploadStudentDetails } from "../../controllers/Admin/uploadStudentList.js";
import { fileUploadMiddleware } from "../../middlewares/fileUploadMiddleware.js";
import { getStudentList } from "../../controllers/Admin/getStudentList.js";
import { getRegisteredStudentsController } from "../../controllers/Admin/getRegisteredStudentController.js";
import { findRegisteredStudentById } from "../../controllers/Admin/findRegisteredStudentbyId.js";
import { studentApprovalController } from "../../controllers/Admin/studentApprovalController.js";
import {  loginController } from "../../controllers/Admin/authController.js";

const router = express.Router();

router.post(
  "/upload-student-details",
  fileUploadMiddleware,
  uploadStudentDetails
);
router.get("/get-student-details", getStudentList);
router.get("/get-registered-students", getRegisteredStudentsController);
router.post("/find-regstudent-by-nic", findRegisteredStudentById);
router.post("/approve-student", studentApprovalController);
router.post('/login',loginController);
export default router;
