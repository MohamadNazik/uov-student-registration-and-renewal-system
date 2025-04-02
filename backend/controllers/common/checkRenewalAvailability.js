import adminUpdatesModel from "../../models/adminUpdatesModel.js";
import adminModel from "../../models/adminModel.js";

export const checkRenewalAvailabilityController = async (req, res) => {
  try {
    const posts = await adminUpdatesModel
      .find({ updateType: "Renewal" })
      .sort({ expireDate: -1 })
      .limit(1);

    if (!posts || posts.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Renewal found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Registration available",
        data: posts,
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
