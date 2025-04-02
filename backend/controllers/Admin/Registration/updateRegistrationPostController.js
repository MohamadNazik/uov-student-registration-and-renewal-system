import adminUpdatesModel from "../../../models/adminUpdatesModel.js";


export const updateRegistrationPostController = async (req, res) => {
  try {
    const {
      id,
      updateType,
      updateMessage,
      expireDate,
      enrollmentDate,
      idCardIssueDate,
      academicYear,
    } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Post ID is required",
      });
    }

    const existingPost = await adminUpdatesModel.findById(id);
    if (!existingPost) {
      return res.status(404).send({
        success: false,
        message: "Registration post not found",
      });
    }

    const updatedPost = await adminUpdatesModel.findByIdAndUpdate(
      id,
      {
        ...(updateType && { updateType }),
        ...(updateMessage && { updateMessage }),
        ...(expireDate && { expireDate }),
        ...(enrollmentDate && { enrollmentDate }),
        ...(idCardIssueDate && { idCardIssueDate }),
        ...(academicYear && { academicYear }),
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Registration post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error updating registration post",
    });
  }
};
