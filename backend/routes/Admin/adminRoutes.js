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
import { createRegistrationPostController } from "../../controllers/Admin/Registration/createRegistrationPostController.js";
import { updateRegistrationPostController } from "../../controllers/Admin/Registration/updateRegistrationPostController.js";
import { deleteRegistrationPostController } from "../../controllers/Admin/Registration/deleteRegistrationController.js";
import { createRenewalPostController } from "../../controllers/Admin/Renewal/createRenewalPostController.js";
import { updateRenewalPostController } from "../../controllers/Admin/Renewal/updateRenewalPostController.js";
import { deleteRenewalPostController } from "../../controllers/Admin/Renewal/deleteRenewalPostController.js";
import { getRegistrationPostController } from "../../controllers/Admin/Registration/getRegistrationPostController.js";
import { getRenewalPostController } from "../../controllers/Admin/Renewal/getRenewalPostController.js";
import { getNotApprovedStudents } from "../../controllers/Admin/getNotApprovedStudents.js";
import { approveRenewalController } from "../../controllers/Admin/Renewal/approveRenewal.js";
import { getAdminDetails } from "../../controllers/Admin/getAdminDetails.js";
import { getRenewalsController } from "../../controllers/Admin/getRenewalsController.js";

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
router.get("/get-not-approved-students", getNotApprovedStudents);

//Registration and Renewal

router.post("/registration-post", createRegistrationPostController);
router.put("/update-registration-post", updateRegistrationPostController);
router.delete("/delete-registration-post", deleteRegistrationPostController);
router.post("/create-renewal-post", createRenewalPostController);
router.put("/update-renewal-post", updateRenewalPostController);
router.delete("/delete-renewal-post", deleteRenewalPostController);
router.get("/get-registration-post", getRegistrationPostController);
router.get("/get-renewal-post", getRenewalPostController);
router.post("/approve-renewal", approveRenewalController);
router.get("/get-admin-details", getAdminDetails);
router.get("/get-renewals", getRenewalsController);
export default router;
