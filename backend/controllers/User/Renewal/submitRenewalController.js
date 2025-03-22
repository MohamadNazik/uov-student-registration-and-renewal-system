import renewalModel from "../../../models/renewalModel.js";
import userModel from "../../../models/userModel.js";
import { uploadFileToS3 } from "../../../utils/awsService.js";

export const submitRenewalController = async (req, res) => {
  try {
    const {
      Enrollment_Number,
      course,
      department,
      specialization,
      present_address,
      receipt_number,
      submission_date,
      payment_date,
      current_year_of_study,
      renwal_academic_year,
    } = req.body;

    const receipt = req.file;
    const extractedText = req.extractedText;

    if (
      !Enrollment_Number ||
      !payment_date ||
      !current_year_of_study ||
      !receipt_number ||
      !course ||
      !department ||
      !present_address ||
      !submission_date ||
      !renwal_academic_year
    ) {
      return res.status(400).send({
        message: "Please provide all necessary data",
      });
    }
    const user = await userModel.findOne({ Enrollment_Number });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }
    if (!receipt) {
      return res.status(400).send({
        success: false,
        message: "Receipt is required",
      });
    }

    if (!extractedText) {
      return res.status(400).send({
        success: false,
        message: "Failed to extract text from receipt",
      });
    }

    if (!extractedText.includes(receipt_number)) {
      return res.status(400).send({
        success: false,
        message: "Receipt number does not match the extracted text",
      });
    }

    const currentYear = parseInt(current_year_of_study);
    const student = await renewalModel.findOne({ Enrollment_Number });

    if (student && student.current_year_of_study === currentYear) {
      return res.status(400).send({
        success: false,
        message: "Student already submitted the renewal",
      });
    }

    const studentFolder = `documents/${Enrollment_Number.replace(/\//g, "")}`;
    const receiptUpload = await uploadFileToS3(receipt, studentFolder);

    const newRenewal = new renewalModel({
      Enrollment_Number,
      course,
      department,
      specialization,
      present_address,
      receipt_number,
      submission_date,
      payment_date,
      receipt: receiptUpload,
      renwal_academic_year,
      renewal_approved: false,
    });

    const savedRenewal = await newRenewal.save();

    res.status(200).send({
      success: true,
      message: "Renewal submitted successfully",
      renewal: savedRenewal,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error submitting renewal",
    });
  }
};
