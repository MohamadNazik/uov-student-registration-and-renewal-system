import renewalModel from "../../../models/renewalModel.js";
import userModel from "../../../models/userModel.js";

export const approveRenewalController = async (req, res) => {
  try {
    const { Enrollment_Number } = req.body;
    if (!Enrollment_Number) {
      return res.status(400).send({
        success: false,
        message: "Enrollment Number is required",
      });
    }

    const student = await renewalModel.findOne({ Enrollment_Number });
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }
    const student1 = await userModel.findOne({
      Enrollment_Number: Enrollment_Number,
    });
    const incrementedYear = student1.year_of_study + 1;
    const user = await userModel.updateOne(
      { Enrollment_Number },
      {
        $set: {
          year_of_study: incrementedYear,
          AcademicYear: "24/25",
        },
      }
    );
    const result = await renewalModel.updateOne(
      { Enrollment_Number },
      {
        $set: {
          renewal_approved: true,
          current_year_of_study: incrementedYear,
          current_academic_year: "24/25",
        },
      }
    );
    if (result.modifiedCount === 0) {
      return res.status(400).send({
        success: false,
        message: "Renewal approval failed",
      });
    }

    res.status(200).send({
      success: true,
      message: "Renewal approved successfully",
      result,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error approving renewal",
      error: error.message,
    });
  }
};
