import adminUpdatesModel from "../../../models/adminUpdatesModel.js";

export const updateRenewalPostController = async (req, res) => {
  try {
    const { id, updateType, updateMessage, expireDate, academicYear } =
      req.body;

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
        message: "Renewal post not found",
      });
    }

    const updatedPost = await adminUpdatesModel.findByIdAndUpdate(
      id,
      {
        ...(updateType && { updateType }),
        ...(updateMessage && { updateMessage }),
        ...(expireDate && { expireDate }),
        ...(academicYear && { academicYear }),
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Renewal post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error updating Renewal post",
    });
  }
};
