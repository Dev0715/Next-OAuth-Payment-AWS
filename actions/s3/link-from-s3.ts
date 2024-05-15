import { getLinkFromS3Server } from "./link-from-s3-server";

export const getLinkFromS3 = async (
  keyName: string,
  s3Link?: Record<string, string>,
  setS3Link?: (_s3Link: Record<string, string>) => void
) => {
  if (s3Link && s3Link[keyName]) {
    return { success: true, response: s3Link[keyName] };
  }

  const response = await getLinkFromS3Server(keyName);
  if (setS3Link && response.success) {
    setS3Link({ ...s3Link, [keyName]: response.response as string });
  }

  return response;
};
