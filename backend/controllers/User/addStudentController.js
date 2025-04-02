import User from "../../models/userModel.js";
import studentListModel from "../../models/studentListModel.js";
import { uploadFileToS3 } from "../../utils/awsService.js";


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

    const address = JSON.parse(Address || "{}");
    const qualifications = JSON.parse(Educational_Qualifications || "{}");
    const citizenDetails = JSON.parse(Details_of_Citizen || "{}");
    const parentDetails = JSON.parse(Details_of_Parents_or_Guardians || "{}");
    const emergencyDetails = JSON.parse(Emergency_Person || "{}");

    if (
      !Enrollment_Number ||
      !Title ||
      !Name_with_Initials ||
      !Name_denoted_by_Initials ||
      !Enrollment_Date ||
      !ID_IssueDate ||
      !AcademicYear ||
      Object.keys(address).length === 0 ||
      Object.keys(qualifications).length === 0 ||
      Object.keys(citizenDetails).length === 0 ||
      Object.keys(parentDetails).length === 0 ||
      Object.keys(emergencyDetails).length === 0
    ) {
      return res.status(400).json({
        message: "Missing required fields. Please provide all necessary data.",
      });
    }

    // Prepare S3 folder
    const studentFolder = `documents/${Enrollment_Number.replace(/\//g, "")}`;
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
      "profile_photo",
      "signature",
    ];

    const documentPaths = {};

    // Upload files to S3
    for (const key of fileKeys) {
      documentPaths[key] = await uploadFileToS3(req.files?.[key]?.[0], studentFolder);
    }

    const courseDetails = await studentListModel.findOne({ RegNo: Enrollment_Number });
    const course = courseDetails.course;
    const department = courseDetails.department;

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
      profile_photo: documentPaths.profile_photo.path,
      signature: documentPaths.signature.path,
      year_of_study: 1,
      course,
      department,
      Documents: documentPaths,
    });

    const savedUser = await newUser.save();

    res.status(200).send({
      message: "User added successfully with files uploaded to S3",
      user: savedUser,
      success: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the user.",
      error: error.message,
      success: false,
    });
  }
};
