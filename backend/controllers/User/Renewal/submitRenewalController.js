import renewalModel from "../../../models/renewalModel.js";
import { uploadFileToS3 } from "../../../utils/awsService.js";

export const submitRenewalController = async (req, res) => {
  try {
    const {
      Enrollment_Number,
      receipt_number,
      payment_date,
      current_year_of_study,
      current_academic_year,
    } = req.body;

    const receipt = req.files?.receipt ? req.files.receipt[0] : null;

    if (
      !Enrollment_Number ||
      !payment_date ||
      !current_academic_year ||
      !current_year_of_study ||
      !receipt_number
    ) {
      return res.status(400).send({
        message: "Please provide all necessary data",
      });
    }

    if (!receipt) {
      return res.status(400).send({
        success: false,
        message: "Receipt is required",
      });
    }

    const currentYear = parseInt(current_year_of_study);
    const student = await renewalModel.find({ Enrollment_Number });

    if (
      student.length > 0 &&
      student[0].current_year_of_study === currentYear
    ) {
      return res.status(400).send({
        success: false,
        message: "Student already submitted the renewal",
      });
    }

    const incrementedYear = currentYear + 1;

    const studentFolder = documents/${Enrollment_Number.replace(/\//g, "")};
    const receiptUpload = await uploadFileToS3(receipt, studentFolder);

    const newRenewal = new renewalModel({
      Enrollment_Number,
      receipt_number,
      payment_date,
      receipt: receiptUpload,
      current_year_of_study: incrementedYear,
      current_academic_year,
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