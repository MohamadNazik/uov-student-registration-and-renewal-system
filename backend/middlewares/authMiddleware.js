import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};
