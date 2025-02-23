import studentListModel from "../../models/studentListModel.js";
import userModel from "../../models/userModel.js";

export const verifyStudentController = async (req, res) => {
  try {
    const { NIC } = req.body;

    const student = await studentListModel.findOne({ NIC });
    if (!student) {
      return res
        .status(404)
        .send({ success: false, message: "Student not found" });
    } else {
      const stu = await userModel.find({"Address.NIC":NIC});
      if(stu.length > 0) {
        return res.status(400).send({
          success: false,
          message: "Student already exists with this NIC"
        })
      }else{
        res.status(200).send({
          success: true,
          message: "verified successfully",
          data: student,
        });
      }
      
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error verifying student",
    });
  }
};
