import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file to S3
export const uploadFileToS3 = async (file, folder) => {
  if (!file) return { Name: "default_file.png", path: "default_file.png" };

  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const filePath = `${folder}/${file.originalname}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return {
    Name: file.originalname,
    path: `https://${bucketName}.s3.${region}.amazonaws.com/${filePath}`,
  };
};

export default s3;