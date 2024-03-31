import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION as string
});
const docClient = DynamoDBDocumentClient.from(dbClient);

const db = globalThis.docClient || docClient;

if (process.env.NODE_ENV !== "production") globalThis.docClient = docClient;

export { db, GetCommand, PutCommand, UpdateCommand };
