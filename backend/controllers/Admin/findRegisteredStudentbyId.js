import userModel from "../../models/userModel.js";

export const findRegisteredStudentById = async (req, res) => {
  try {
    const { Enrollment_Number } = req.body;

    const student = await userModel.findOne({Enrollment_Number});
    if (student) {
      res.status(200).send({
        message: "Student found",
        success: true,
        data: student,
      });
    } else {
      res.status(404).send({
        message: "Student not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
