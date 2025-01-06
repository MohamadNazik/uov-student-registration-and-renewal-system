import studentListModel from "../../models/studentListModel.js";

export const getStudentList = async (req, res) => {
  try {
    const list = await studentListModel.find({});
    if (list) {
      res.status(200).send({
        success: true,
        message: "Student List Fetched Successfully",
        data: list,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "error fetching student",
    });
  }
};
