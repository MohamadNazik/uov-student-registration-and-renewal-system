export const UgcLetterVerify = async (req, res) => {
  try {
    const { extractedText } = req;
    if (!extractedText) {
      return res
        .status(400)
        .send({ success: false, message: "No text provided for analysis" });
    }

    const lowerCaseExtractedText = extractedText.toLowerCase();
    console.log(lowerCaseExtractedText);

    const predefinedTexts = [
      "university admission",
      "university grant commission",
    ];

    const matches = predefinedTexts.filter((text) =>
      lowerCaseExtractedText.includes(text)
    );

    matches.length > 0
      ? res.status(200).send({
          success: true,
          message: "Verified UGC Letter",
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
