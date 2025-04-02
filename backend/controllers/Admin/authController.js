import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../../models/adminModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }


    const isMatch = await bcrypt.compare(password, admin.password);
// const isMatch = password === admin.password;
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
        role: admin.role,
        permissions: admin.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};