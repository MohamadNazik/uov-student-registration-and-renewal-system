import adminUpdatesModel from "../../../models/adminUpdatesModel.js";


export const deleteRenewalPostController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Post ID is required",
      });
    }

    const deletedPost = await adminUpdatesModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).send({
        success: false,
        message: "Renewal post not found",
      });
    }

    return res.status(200).send({
        success: true,
        message: "Renewal post deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error.message,
        message: "Error deleting Renewal post",
      });
    }
  };