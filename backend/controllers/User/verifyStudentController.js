import studentListModel from "../../models/studentListModel.js";

export const verifyStudentController = async (req, res) => {
  try {
    const { NIC } = req.body;

    const student = await studentListModel.findOne({ NIC });
    if (!student) {
      return res
        .status(404)
        .send({ success: false, message: "Student not found" });
    } else {
      res.status(200).send({
        success: true,
        message: "verified successfully",
        data: student,
      });
    }
  } catch (error) {}
};
