export const AWS_CREDENTIAL = {
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  REGION: process.env.AWS_REGION || ""
};

export const AWS_DYNAMO_TABLES = {
  USER: process.env.AWS_DYNAMODB_USERS_TABLE_NAME,
  PRODUCT: process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME,
  BUNDLE: process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME
};

export const AWS_S3_BUCKETS = {
  DOWNLOAD: process.env.AWS_BUCKET_NAME,
  LISTING: process.env.AWS_BUCKET_NAME
};

export const AUTH_CONFIG = {
  SECRET: process.env.AUTH_SECRET,
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
  },
  DISCORD: {
    CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET
  },
  APPLE: {
    CLIENT_ID: process.env.APPLE_CLIENT_ID,
    CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET
  },
  ADOBE: {
    CLIENT_ID: process.env.ADOBE_CLIENT_ID,
    CLIENT_SECRET: process.env.ADOBE_CLIENT_SECRET
  },
  EPIC: {
    CLIENT_ID: process.env.EPIC_CLIENT_ID,
    CLIENT_SECRET: process.env.EPIC_CLIENT_SECRET
  }
};
