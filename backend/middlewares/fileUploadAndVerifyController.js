import fs from "fs-extra";
import path from "path";
import axios from "axios";
import FormData from "form-data";

export const fileUploadAndVerifyController = async (req, res, next) => {
  const pdfFile = req.file;

  if (!pdfFile) {
    return res
      .status(400)
      .send({ success: false, message: "No PDF file provided" });
  }

  const pdfPath = pdfFile.path;

  try {
    const formData = new FormData();
    formData.append("pdf", fs.createReadStream(pdfPath));

    const response = await axios.post(
      "http://127.0.0.1:5000/extract-text",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    await fs.remove(pdfPath);

    req.extractedText = response.data.texts[0].text;
    next();
  } catch (error) {
    console.error("Error processing PDF:", error.message);
    res
      .status(500)
      .send({ success: false, message: "Error processing PDF", error: error });
  }
};
