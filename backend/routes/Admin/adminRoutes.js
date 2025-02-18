import express from "express";
import { uploadStudentDetails } from "../../controllers/Admin/uploadStudentList.js";
import { fileUploadMiddleware } from "../../middlewares/fileUploadMiddleware.js";
import { getStudentList } from "../../controllers/Admin/getStudentList.js";
import { getRegisteredStudentsController } from "../../controllers/Admin/getRegisteredStudentController.js";

const router = express.Router();

router.post(
  "/upload-student-details",
  fileUploadMiddleware,
  uploadStudentDetails
);
router.get("/get-student-details", getStudentList);
router.get("/get-registered-students", getRegisteredStudentsController);

export default router;
