import adminUpdatesModel from "../../models/adminUpdatesModel.js";
import adminModel from "../../models/adminModel.js";

export const checkRegistrationAvailabilityController = async (req, res) => {
  try {
    const posts = await adminUpdatesModel
      .find({ updateType: "Registration" })
      .sort({ expireDate: -1 })
      .limit(1);

    if (!posts || posts.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No registration post found",
      });
    } else {
      const signature = await adminModel.findOne({
        email: "deputy@example.com",
      });

      return res.status(200).send({
        success: true,
        message: "Registration available",
        data: posts,
        signatureData: signature ? signature.eSignature : null,
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
