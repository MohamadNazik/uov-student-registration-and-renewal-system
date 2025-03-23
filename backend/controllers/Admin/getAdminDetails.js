import jwt from "jsonwebtoken";
import adminModel from "../../models/adminModel.js";

export const getAdminDetails = async (req, res) => {
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

    const admin = await adminModel.findById(decoded._id);

    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Admin details fetched successfully",
      admin,
    });
  } catch (error) {
    console.error("Error fetching Admin details:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching Admin details",
    });
  }
};
