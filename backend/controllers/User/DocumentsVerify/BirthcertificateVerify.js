export const BirthcertificateVerify = async (req, res) => {
    try {
      const { extractedText } = req;
      if (!extractedText) {
        return res
          .status(400)
          .send({ success: false, message: "No text provided for analysis" });
      }
  
      // Convert extracted text to lowercase
      const lowerCaseExtractedText = extractedText.toLowerCase();
      console.log(lowerCaseExtractedText);
  
      // Define predefined texts in lowercase
      const predefinedTexts = ["national birth certificate", "date of birth" , "place of birth"];
  
      // Check for matches
      const matches = predefinedTexts.filter((text) =>
        lowerCaseExtractedText.includes(text)
      );
  
      matches.length > 0
        ? res.status(200).send({
            success: true,
            message: "Verified birth Certificate",
            matches,
          })
        : res.status(200).send({
            success: false,
            message: "Not verified",
            matches,
          });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  