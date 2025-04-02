from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pdf2image import convert_from_path
import pytesseract

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/extract-text', methods=['POST'])
def extract_text():
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400

    pdf_file = request.files['pdf']
    try:
        pdf_path = os.path.join(UPLOAD_FOLDER, pdf_file.filename)
        pdf_file.save(pdf_path)

        # Convert PDF to images
        images = convert_from_path(pdf_path)
        extracted_texts = []

        for i, image in enumerate(images):
            # Extract text using Tesseract
            text = pytesseract.image_to_string(image)
            extracted_texts.append({"page": i + 1, "text": text})

        # Clean up PDF file
        os.remove(pdf_path)

        return jsonify({"texts": extracted_texts}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to process PDF. {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
