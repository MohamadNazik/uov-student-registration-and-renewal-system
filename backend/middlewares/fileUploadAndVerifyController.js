import fs from "fs-extra";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

export const fileUploadAndVerifyController = async (req, res, next) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res
      .status(400)
      .send({ success: false, message: "No file provided" });
  }

  let pdfPath;
  let needsCleanup = false;

  try {
    // Check if the uploaded file is a PDF or an image
    const fileExtension = path.extname(uploadedFile.originalname).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(fileExtension);
    const isPdf = fileExtension === '.pdf';

    if (!isPdf && !isImage) {
      return res
        .status(400)
        .send({ success: false, message: "Unsupported file format. Please upload a PDF or image file." });
    }

    if (isImage) {
      // Convert image to PDF
      const imagePath = uploadedFile.path;
      pdfPath = path.join(path.dirname(imagePath), `${path.basename(imagePath, fileExtension)}.pdf`);
      needsCleanup = true;

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      
      // Get image dimensions
      const imageMetadata = await sharp(imagePath).metadata();
      const { width, height } = imageMetadata;
      
      // Set page size to match image dimensions
      page.setSize(width, height);
      
      // Convert image to appropriate format for embedding
      let imageBytes;
      if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
        imageBytes = await fs.readFile(imagePath);
        const image = await pdfDoc.embedJpg(imageBytes);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      } else {
        // For non-JPEG images, convert to PNG first
        const pngBuffer = await sharp(imagePath).png().toBuffer();
        const image = await pdfDoc.embedPng(pngBuffer);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      }
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      await fs.writeFile(pdfPath, pdfBytes);
      
      // Clean up the original image
      await fs.remove(imagePath);
    } else {
      // Use the original PDF file
      pdfPath = uploadedFile.path;
    }

    // Process the PDF with the text extraction API
    const formData = new FormData();
    formData.append("pdf", fs.createReadStream(pdfPath));

    const response = await axios.post(
      "http://127.0.0.1:5000/extract-text",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Clean up the file after processing
    await fs.remove(pdfPath);

    req.extractedText = response.data.texts[0].text;
    next();
  } catch (error) {
    console.error("Error processing file:", error.message);
    
    // Clean up any temporary files on error
    if (pdfPath && fs.existsSync(pdfPath)) {
      await fs.remove(pdfPath);
    }
    
    res
      .status(500)
      .send({ success: false, message: "Error processing file", error: error.message });
  }
};