import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";
config();
const S3 = new S3Client({
  region: `${process.env.Region}`,
  credentials: {
    accessKeyId: `${process.env.KeyID}`,
    secretAccessKey: `${process.env.S3_SecretID}`,
  },
});

export function uploadFile(file: any, name: string) {
  const uploadParams = {
    Bucket: `${process.env.BucketName}`,
    Body: file.buffer,
    Key: name,
    ContentType: file.mimetype,
  };
  return S3.send(new PutObjectCommand(uploadParams));
}
