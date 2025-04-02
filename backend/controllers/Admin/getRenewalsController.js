import renewalModel from "../../models/renewalModel.js";

export const getRenewalsController = async (req, res) => {
  try {
    const renewals = await renewalModel.find({});
    if (renewals.length != 0) {
      return res.status(200).send({
        success: true,
        renewals: renewals,
      });
    }
    return res.status(200).send({
      success: false,
      message: "No renewals found",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
