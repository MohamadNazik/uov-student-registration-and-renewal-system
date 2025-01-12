import express from "express";
import { verifyStudentController } from "../../controllers/User/verifyStudentController.js";
import multer from "multer";
import { fileUploadAndVerifyController } from "../../middlewares/fileUploadAndVerifyController.js";
import { olCertificateVerify } from "../../controllers/User/DocumentsVerify/olCertificateVerify.js";
import { documentUploadMiddleware } from "../../middlewares/fileUploadMiddleware.js";
import { addStudentController } from "../../controllers/User/addStudentController.js";
import { AlCertificateVerify } from "../../controllers/User/DocumentsVerify/AlCertificateVerify.js";
import { BirthcertificateVerify } from "../../controllers/User/DocumentsVerify/BirthcertificateVerify.js";
import { MedicalCertificateVerify } from "../../controllers/User/DocumentsVerify/MedicalCertificateVerify.js";
import { Nicverify } from "../../controllers/User/DocumentsVerify/Nicverify.js";
import { SchoolLeavingCertificateVerify } from "../../controllers/User/DocumentsVerify/SchoolLeavingCertificateVerify.js";
import { A3FormVerify } from "../../controllers/User/DocumentsVerify/A3FormVerify.js";
import { A4FormVerify } from "../../controllers/User/DocumentsVerify/A4FormVerify.js";
import { A5FormVerify } from "../../controllers/User/DocumentsVerify/A5FormVerify.js";
import { A6FormVerify } from "../../controllers/User/DocumentsVerify/A6FormVerify.js";
import { AttestationVerify } from "../../controllers/User/DocumentsVerify/AttestationVerify.js";
import { PaymentVerify } from "../../controllers/User/DocumentsVerify/PaymentVerify.js";

const router = express.Router();

router.post("/verifyStudent", verifyStudentController);
const upload = multer({ dest: "uploads/" });

router.post(
  "/verify-ol",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  olCertificateVerify
);
router.post(
  "/verify-al",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  AlCertificateVerify
);
router.post(
  "/verify-bc",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  BirthcertificateVerify
);

router.post(
  "/verify-nic",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  Nicverify
);
router.post(
  "/verify-slc",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  SchoolLeavingCertificateVerify
);
router.post(
  "/verify-attestation",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  AttestationVerify
);
router.post(
  "/verify-payment",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  PaymentVerify
);
router.post(
  "/verify-a3form",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  A3FormVerify
);
router.post(
  "/verify-a4form",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  A4FormVerify
);
router.post(
  "/verify-a5form",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  A5FormVerify
);
router.post(
  "/verify-a6form",
  upload.single("pdf"),
  fileUploadAndVerifyController,
  A6FormVerify
);
router.post("/add-student", documentUploadMiddleware, addStudentController);

export default router;
