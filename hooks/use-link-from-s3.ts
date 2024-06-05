import { useAtom } from "jotai";

import { getLinkFromS3Server } from "@/actions/s3/link-from-s3-server";
import { BucketType } from "@/actions/s3/upload-file";
import { s3LinkAtom } from "@/store/s3-link";

export const useLinkFromS3 = () => {
  const [s3Link, setS3Link] = useAtom(s3LinkAtom);

  const getLinkFromS3 = async (keyName: string, bucketType: BucketType) => {
    if (s3Link && s3Link[keyName]) {
      return { success: true, response: s3Link[keyName] };
    }

    const res = await getLinkFromS3Server(keyName, bucketType);
    if (setS3Link && res.success) {
      setS3Link((prev) => ({ ...prev, [keyName]: res.response as string }));
    }

    return res;
  };

  return { getLinkFromS3 };
};
