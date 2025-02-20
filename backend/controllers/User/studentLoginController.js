import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import  jwt  from 'jsonwebtoken';

export const studentLoginController = async (req, res) => {
  try {
    const { Enrollment_Number, password } = req.body;

    const student = await userModel.findOne({ Enrollment_Number });

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    } else {
      const isMatch = await bcrypt.compare(
        password,
        student.permanent_password
      );

      if (!isMatch) {
        return res.status(401).send({
          success: false,
          message: "Invalid Password",
        });
      } else {
        const token = jwt.sign(
          {
            _id: student._id,
            Enrollment_Number: student.Enrollment_Number,
            Name: student.Full_Name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).send({
          success: true,
          message: "Login successful",
          token,
          data: {
            _id: student._id,
            Enrollment_Number: student.Enrollment_Number,
            Name: student.Full_Name,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error logging in student",
    });
  }
};
