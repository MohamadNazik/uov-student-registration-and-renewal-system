import userModel from "../../models/userModel.js";

export const getRegisteredStudentsController = async (req, res) => {
  try {
    const students = await userModel.find({ registration_approval: true });
    if (students.length) {
      res.status(200).send({
        success: true,
        message: "Registered Students fetched successfully",
        data: students,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No registered students found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
