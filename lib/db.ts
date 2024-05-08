import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { AWS_CREDENTIAL } from "@/shared/constants/server.constant";

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: AWS_CREDENTIAL.ACCESS_KEY_ID,
    secretAccessKey: AWS_CREDENTIAL.ACCESS_KEY
  },
  region: AWS_CREDENTIAL.REGION
});
const docClient = DynamoDBDocumentClient.from(dbClient);

// const db = (globalThis.docClient || docClient) as DynamoDBClient;
// if (process.env.NODE_ENV !== "production") globalThis.docClient = docClient;

export default docClient;
