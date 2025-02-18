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
      Full_Name,
      Initials,
      Address,
      Educational_Qualifications,
      Details_of_Citizen,
      Details_of_Parents,
      Emergency_Person,
    } = req.body;

    const address = Address || {};
    const qualifications = Educational_Qualifications || {};
    const citizenDetails = Details_of_Citizen || {};
    const parentDetails = Details_of_Parents || {};
    const emergencyDetails = Emergency_Person || {};

    if (
      !Enrollment_Number ||
      !Title ||
      !Full_Name ||
      !Initials ||
      !address ||
      !qualifications ||
      !citizenDetails ||
      !parentDetails ||
      !emergencyDetails ||
      !req.files
    ) {
      return res.status(400).json({
        message:
          "Missing required fields or files. Please provide all necessary data.",
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
    const fileKeys = ["UGC_Letter"];

    for (const key of fileKeys) {
      if (req.files[key]) {
        const file = req.files[key][0];
        const filePath = path.join(studentDir, file.originalname);

        fs.writeFileSync(filePath, file.buffer);

        documentPaths[key] = { Name: file.originalname, path: filePath };
      }
    }
    if (req.files.profile_photo) {
      const profilePhoto = req.files.profile_photo[0];
      const profilePhotoPath = path.join(studentDir, profilePhoto.originalname);

      fs.writeFileSync(profilePhotoPath, profilePhoto.buffer);
      documentPaths.profile_photo = profilePhotoPath;
    }

    const newUser = new User({
      Enrollment_Number,
      registration_approval: false,
      Title,
      Full_Name,
      Initials,
      Address: address,
      Educational_Qualifications: qualifications,
      Details_of_Citizen: citizenDetails,
      Details_of_Parents: parentDetails,
      Emergency_Person: emergencyDetails,
      profile_photo: documentPaths.profile_photo,
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
