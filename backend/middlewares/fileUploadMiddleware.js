import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed.")
      );
    }
    cb(null, true);
  },
});

export const fileUploadMiddleware = upload.single("file");

export const documentUploadMiddleware = upload.fields([
  { name: "UGC_Letter", maxCount: 1 },
  { name: "profile_photo", maxCount: 1 },
  // { name: "Birth_Certificate" },
  // { name: "School_leaving" },
  // { name: "NIC" },
  // { name: "OL_Result_Sheet" },
  // { name: "AL_Result_Sheet" },
  // { name: "Bank_Slip" },
  // { name: "Information_Sheet" },
  // { name: "Declaration_Form" },
  // { name: "Games_Form" },
  // { name: "Hostal_Accomodation" },
  // { name: "Digital_Signature" },
  // { name: "Attestaion_Form" },
]);
