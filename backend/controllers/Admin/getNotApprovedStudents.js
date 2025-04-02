import userModel from "../../models/userModel.js";

export const getNotApprovedStudents = async (req, res) => {
  try {
    const students = await userModel.find({ registration_approval: false });

    if (students.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No students not approved",
      });
    } else {
      res.status(200).send({
        success: true,
        students: students,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
