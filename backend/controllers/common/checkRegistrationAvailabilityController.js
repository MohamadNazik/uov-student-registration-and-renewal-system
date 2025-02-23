import adminUpdatesModel from "../../models/adminUpdatesModel.js";

export const checkRegistrationAvailabilityController = async (req, res) => {
  try {
    const posts = await adminUpdatesModel
      .find({ updateType: "Registration" })
      .sort({ expireDate: -1 })
      .limit(1);

    if (!posts || posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No registration post found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Registration available",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error checking registration availability",
      error: error.message,
    });
  }
};
