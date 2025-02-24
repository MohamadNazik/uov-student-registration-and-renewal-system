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
        new Error(
          "Invalid file type. Only PDF, JPEG, PNG, and Excel files are allowed."
        )
      );
    }
    cb(null, true);
  },
});

export const fileUploadMiddleware = upload.single("file");

export const documentUploadMiddleware = upload.fields([
  { name: "UGC_Letter", maxCount: 1 },
  { name: "profile_photo", maxCount: 1 },
  { name: "BC", maxCount: 1 },
  { name: "NIC", maxCount: 1 },
  { name: "OL", maxCount: 1 },
  { name: "AL", maxCount: 1 },
  { name: "A3", maxCount: 1 },
  { name: "A4", maxCount: 1 },
  { name: "A5", maxCount: 1 },
  { name: "A6", maxCount: 1 },
  { name: "Attestation", maxCount: 1 },
  { name: "signature", maxCount: 1 },
]);
