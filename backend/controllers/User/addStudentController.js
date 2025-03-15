import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
import studentListModel from "../../models/studentListModel.js";

dotenv.config();

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Add Student Controller
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

    // Validate required fields
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

    // Prepare the S3 folder structure
    const studentFolder = `documents/${Enrollment_Number.replace(/\//g, "")}`;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;

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
      "profile_photo",
      "signature",
    ];

    // Upload each file to S3
    for (const key of fileKeys) {
      if (req.files?.[key]?.length) {
        const file = req.files[key][0];
        const fileName = file.originalname;
        const filePath = `${studentFolder}/${fileName}`;


        const uploadParams = {
          Bucket: bucketName,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read", 
        };
        

        await s3.send(new PutObjectCommand(uploadParams));

        // Generate Public URL
        const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${filePath}`;

        // Store the actual S3 URL in the documentPaths object
        documentPaths[key] = { Name: fileName, path: fileUrl };
      } else {
        // Assign default placeholder
        documentPaths[key] = { Name: "default_file.png", path: "default_file.png" };
      }
    }

    // Special handling for Profile Photo
    if (req.files?.profile_photo?.length) {
      const profilePhoto = req.files.profile_photo[0];
      const profilePhotoPath = `${studentFolder}/profile_photo/${profilePhoto.originalname}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: profilePhotoPath,
        Body: profilePhoto.buffer,
        ContentType: profilePhoto.mimetype,
      };

     
      await s3.send(new PutObjectCommand(uploadParams));

      documentPaths.profile_photo = {
        Name: profilePhoto.originalname,
        path: `https://${bucketName}.s3.${region}.amazonaws.com/${profilePhotoPath}`,
      };
    } else {
      documentPaths.profile_photo = { Name: "default_profile.png", path: "default_profile.png" };
    }

    // Special handling for Signature
    if (req.files?.signature?.length) {
      const signaturePhoto = req.files.signature[0];
      const signaturePhotoPath = `${studentFolder}/signature/${signaturePhoto.originalname}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: signaturePhotoPath,
        Body: signaturePhoto.buffer,
        ContentType: signaturePhoto.mimetype,
      };

   
      await s3.send(new PutObjectCommand(uploadParams));

      documentPaths.signature = {
        Name: signaturePhoto.originalname,
        path: `https://${bucketName}.s3.${region}.amazonaws.com/${signaturePhotoPath}`,
      };
    } else {
      documentPaths.signature = { Name: "default_signature.png", path: "default_signature.png" };
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
      course:course,
      department:department,
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
