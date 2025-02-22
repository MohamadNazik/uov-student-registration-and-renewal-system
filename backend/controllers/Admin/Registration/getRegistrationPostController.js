import adminUpdatesModel from "../../../models/adminUpdatesModel.js";

export const getRegistrationPostController = async (req, res) => {
  try {
    const posts = await adminUpdatesModel.find({ updateType: "Registration" });

    if (!posts || posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No registration posts found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Registration posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching registration posts",
      error: error.message,
    });
  }
};
