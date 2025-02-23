import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only PDF, JPEG, PNG, and Excel files are allowed.")
      );
    }
    cb(null, true);
  },
});

export const fileUploadMiddleware = upload.single("file");

export const documentUploadMiddleware = upload.fields([
  { name: "UGC_Letter", maxCount: 1 },
  { name: "profile_photo", maxCount: 1 },
  { name: "Birth_Certificate", maxCount: 1 },
  { name: "School_leaving", maxCount: 1 },
  { name: "NIC", maxCount: 1 },
  { name: "OL_Result_Sheet", maxCount: 1 },
  { name: "AL_Result_Sheet", maxCount: 1 },
  { name: "Bank_Slip", maxCount: 1 },
  { name: "Information_Sheet", maxCount: 1 },
  { name: "Declaration_Form", maxCount: 1 },
  { name: "Games_Form", maxCount: 1 },
  { name: "Hostal_Accomodation", maxCount: 1 },
  { name: "Digital_Signature", maxCount: 1 },
  { name: "Attestaion_Form", maxCount: 1 },
]);