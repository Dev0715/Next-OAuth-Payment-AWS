import { SESClient } from "@aws-sdk/client-ses";

import { AWS_CREDENTIAL } from "@/shared/constants/server.constant";

const sesClient = new SESClient({
  credentials: {
    accessKeyId: AWS_CREDENTIAL.ACCESS_KEY_ID,
    secretAccessKey: AWS_CREDENTIAL.ACCESS_KEY
  },
  region: AWS_CREDENTIAL.REGION
});

export default sesClient;
