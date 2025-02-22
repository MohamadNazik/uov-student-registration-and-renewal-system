import express from "express";
import { uploadStudentDetails } from "../../controllers/Admin/uploadStudentList.js";
import { fileUploadMiddleware } from "../../middlewares/fileUploadMiddleware.js";
import { getStudentList } from "../../controllers/Admin/getStudentList.js";
import { getRegisteredStudentsController } from "../../controllers/Admin/getRegisteredStudentController.js";
import { findRegisteredStudentById } from "../../controllers/Admin/findRegisteredStudentbyId.js";
import { studentApprovalController } from "../../controllers/Admin/studentApprovalController.js";
import { loginController } from "../../controllers/Admin/authController.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { checkPermission } from "../../middlewares/checkPermissions.js";
import { createRegistrationPostController } from "../../controllers/Admin/Renewal/createRegistrationPost.js";

const router = express.Router();

router.post(
  "/upload-student-details",
  fileUploadMiddleware,
  uploadStudentDetails
);
router.get("/get-student-details", getStudentList);
router.get("/get-registered-students", getRegisteredStudentsController);
router.post("/find-regstudent-by-nic", findRegisteredStudentById);
router.post(
  "/approve-student",
  authenticate,
  checkPermission("approve_student"),
  studentApprovalController
);
router.post("/login", loginController);
router.post('/registration-post',createRegistrationPostController);
export default router;