import adminUpdatesModel from "../../../models/adminUpdatesModel.js";

export const getRenewalPostController = async (req, res) => {
  try {
    const posts = await adminUpdatesModel.find({ updateType: "Renewal" });

    if (!posts || posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No renewal posts found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Renewal posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching renewal posts",
      error: error.message,
    });
  }
};
