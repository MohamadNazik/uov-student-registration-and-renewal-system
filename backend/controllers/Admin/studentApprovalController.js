import userModel from "../../models/userModel.js";

export const studentApprovalController = async (req, res) => {
  try {
    const { Enrollment_Number } = req.body;

    if (!Enrollment_Number) {
      return res.status(400).send({
        success: false,
        message: "Enrollment Number is required",
      });
    } else {
      const student = await userModel.findOne({ Enrollment_Number });

      if (!student) {
        return res.status(404).send({
          success: false,
          message: "Student not found",
        });
      } else {
        if (student.registration_approval === false) {
          const result = await userModel.updateOne(
            { Enrollment_Number },
            { $set: { registration_approval: true } }
          );

          if (result.matchedCount === 0) {
            return res.status(404).send({
              success: false,
              message: "Student not found during update",
            });
          }

          const updatedStudent = await userModel.findOne({ Enrollment_Number });

          return res.status(200).send({
            success: true,
            message: "Student approved successfully",
            data: updatedStudent,
          });
        } else {
          res.status(200).send({
            success: false,
            message: "Student is already approved",
          });
        }
      }
    }
  } catch (error) {
    console.error("Error in approving student:", error);
    return res.status(500).send({
      success: false,
      message: "Error in approving student",
      error: error.message,
    });
  }
};
