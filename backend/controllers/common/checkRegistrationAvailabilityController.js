import adminUpdatesModel from "../../models/adminUpdatesModel.js";

export const checkRegistrationAvailabilityController = async (req, res) => {
  try {
    const { updateType, currentDate } = req.body;

    if (!currentDate || !updateType) {
      return res.status(400).send({
        success: false,
        message: "Current Date and Update Type are required",
      });
    }

    if (updateType !== "Registration") {
      return res.status(400).send({
        success: false,
        message: "This endpoint only checks Registration availability",
      });
    }

    let parsedCurrentDate;
    try {
      parsedCurrentDate = new Date(currentDate);
      if (isNaN(parsedCurrentDate.getTime())) {
        throw new Error("Invalid date format");
      }
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: "Current Date must be a valid date (e.g., '2025-04-01')",
      });
    }

    const posts = await adminUpdatesModel
      .find({ updateType: "Registration" })
      .sort({ expireDate: -1 })
      .limit(1);

    if (!posts || posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No registration post found",
      });
    }

    const latestPost = posts[0];
    const expireDate = new Date(latestPost.expireDate);

    if (expireDate > parsedCurrentDate) {
      return res.status(200).send({
        success: true,
        message: "Registration is available",
        data: {
          expireDate: latestPost.expireDate,
          currentDate: parsedCurrentDate,
        },
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Registration is not available",
        data: {
          expireDate: latestPost.expireDate,
          currentDate: parsedCurrentDate,
        },
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
