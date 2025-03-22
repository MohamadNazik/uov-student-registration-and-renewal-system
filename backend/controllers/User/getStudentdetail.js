import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export const getStudentDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract actual token

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).send({
          success: false,
          message: "Unauthorized: Token has expired",
        });
      }
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
    console.error("Error fetching student details:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching student details",
    });
  }
};
