import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { generateDefaultPassword } from "../../utils/defaultPasswordGenerator.js";
import { sendPasswordEmail } from "../../utils/emailService.js";
import { hashPassword } from "../../utils/hashPassword.js";

export const studentApprovalController = async (req, res) => {
  try {
    const { Enrollment_Number } = req.body;

    if (!Enrollment_Number) {
      return res.status(400).send({
        success: false,
        message: "Enrollment Number is required",
      });
    }

    const student = await userModel.findOne({ Enrollment_Number });

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    const defaultPassword = generateDefaultPassword();
    console.log(defaultPassword);

    const hashedPassword = await hashPassword(defaultPassword);

    const result = await userModel.updateOne(
      { Enrollment_Number },
      {
        $set: {
          registration_approval: true,
          default_password: hashedPassword,
          permanent_password: hashedPassword,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found during update",
      });
    }

    await sendPasswordEmail(
      student.Address.Email,
      Enrollment_Number,
      defaultPassword
    );

    return res.status(200).send({
      success: true,
      message:
        "Student approved successfully. Default password sent to the student's email.",
      data: {
        Enrollment_Number: student.Enrollment_Number,
        email: student.Address.Email,
      },
    });
  } catch (error) {
    console.error("Error in approving student:", error);
    return res.status(500).send({
      success: false,
      message: "Error in approving student",
      error: error.message,
    });
  }
};
