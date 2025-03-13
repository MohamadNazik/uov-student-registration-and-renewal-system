import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export const getStudentDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    const student = await userModel.findById(decoded._id);

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student details fetched successfully",
      student,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error fetching student details",
    });
  }
};
