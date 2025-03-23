import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { hashPassword } from "../../utils/hashPassword.js";

export const changePasswordController = async (req, res) => {
  try {
    const {
      Enrollment_Number,
      permanent_password,
      new_password,
      confirm_password,
    } = req.body;

    if (!permanent_password || !new_password || !confirm_password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    } else {
      const student = await userModel.findById({
        Enrollment_Number: Enrollment_Number,
      });

      if (!student) {
        res.status(404).send({
          success: false,
          message: "Student not found",
        });
      } else {
        const isMatch = await bcrypt.compare(
          permanent_password,
          student.permanent_password
        );
        if (!isMatch) {
          return res.status(401).send({
            success: false,
            message: "Invalid current password",
          });
        } else {
          if (new_password !== confirm_password) {
            return res.status(400).send({
              success: false,
              message: "New password and confirm password do not match",
            });
          } else {
            const hashedPassword = await hashPassword(new_password);
            const result = await student.updateOne({
              permanent_password: hashedPassword,
            });
            return res.status(200).send({
              success: true,
              message: "Password updated successfully",
              student,
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
