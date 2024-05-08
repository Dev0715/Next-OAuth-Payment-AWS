import { S3Client } from "@aws-sdk/client-s3";

import { AWS_CREDENTIAL } from "@/shared/constants/server.constant";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_CREDENTIAL.ACCESS_KEY_ID,
    secretAccessKey: AWS_CREDENTIAL.ACCESS_KEY
  },
  region: AWS_CREDENTIAL.REGION
});

export default s3Client;
