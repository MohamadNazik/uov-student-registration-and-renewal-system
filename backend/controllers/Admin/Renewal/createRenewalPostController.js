import adminUpdatesModel from "../../../models/adminUpdatesModel.js";

export const createRenewalPostController = async (req, res) => {
  try {
    const { adminId, updateType, expireDate, academicYear } = req.body;

    if (!updateType || !expireDate || !academicYear) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    } else {
      if (updateType !== "Renewal") {
        return res.status(400).send({
          success: false,
          message: "Invalid update type",
        });
      } else {
        const registrationPost = new adminUpdatesModel({
          adminId,
          updateType,
          expireDate,
          academicYear,
        });
        await registrationPost.save();
        return res.status(200).send({
          success: true,
          message: "Renewal post created successfully",
          registrationPost,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error creating Renewal post",
    });
  }
};
