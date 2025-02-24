import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../../models/userModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const addStudentController = async (req, res) => {
  try {
    const {
      Enrollment_Number,
      Title,
      Name_with_Initials,
      Name_denoted_by_Initials,
      Enrollment_Date,
      ID_IssueDate,
      AcademicYear,
      Address,
      Educational_Qualifications,
      Details_of_Citizen,
      Details_of_Parents_or_Guardians,
      Emergency_Person,
    } = req.body;

    const address = Address || {};
    const qualifications = Educational_Qualifications || {};
    const citizenDetails = Details_of_Citizen || {};
    const parentDetails = Details_of_Parents_or_Guardians || {};
    const emergencyDetails = Emergency_Person || {};

    // Check required fields
    if (
      !Enrollment_Number ||
      !Title ||
      !Name_with_Initials ||
      !Name_denoted_by_Initials ||
      !Enrollment_Date ||
      !ID_IssueDate ||
      !AcademicYear ||
      !address ||
      !qualifications ||
      !citizenDetails ||
      !parentDetails ||
      !emergencyDetails 
    ) {
      return res.status(400).json({
        message: "Missing required fields. Please provide all necessary data.",
      });
    }

    const studentDir = path.join(
      __dirname,
      "../Documents/",
      Enrollment_Number.replace(/\//g, "")
    );

    if (!fs.existsSync(studentDir)) {
      fs.mkdirSync(studentDir, { recursive: true });
    }

    const documentPaths = {};
    const fileKeys = [
      "UGC_Letter",
      "BC",
      "NIC",
      "OL",
      "AL",
      "A3",
      "A4",
      "A5",
      "A6",
      "Attestation",
    ];

    // Process uploaded files
    for (const key of fileKeys) {
      if (req.files && req.files[key]) {
        const file = req.files[key][0];
        const filePath = path.join(studentDir, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        if (key === "Digital_Signature") {
          documentPaths[key] = { signatureData: filePath, timestamp: new Date(), signedBy: "Student" };
        } else {
          documentPaths[key] = { Name: file.originalname, path: filePath };
        }
      }
    }

    if (req.files && req.files.profile_photo) {
      const profilePhoto = req.files.profile_photo[0];
      const profilePhotoPath = path.join(studentDir, profilePhoto.originalname);
      fs.writeFileSync(profilePhotoPath, profilePhoto.buffer);
      documentPaths.profile_photo = profilePhotoPath;
    }

    const newUser = new User({
      Enrollment_Number,
      Title,
      Name_with_Initials,
      Name_denoted_by_Initials,
      Enrollment_Date,
      ID_IssueDate,
      AcademicYear,
      Address: address,
      Educational_Qualifications: qualifications,
      Details_of_Citizen: citizenDetails,
      Details_of_Parents_or_Guardians: parentDetails,
      Emergency_Person: emergencyDetails,
      profile_photo: documentPaths.profile_photo || "default_profile.png",
      Documents: documentPaths,
    });

    const savedUser = await newUser.save();

    res.status(200).send({
      message: "User added successfully with files",
      user: savedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the user.",
      error: error.message,
      success: false,
    });
  }
};
