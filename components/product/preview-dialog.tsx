import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { FileOrString } from "@/shared/types/file-preview-types";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAtom } from "jotai";
import { s3LinkAtom } from "@/store/s3-link";

type Props = {
  isPreviewing: boolean;
  setPreviewing: (isPreviewing: boolean) => void;
  image: FileOrString;
};

export const PreviewDialog = ({
  isPreviewing,
  setPreviewing,
  image
}: Props) => {
  const [imageURL, setImageURL] = useState<string>("");
  const [s3Link, setS3Link] = useAtom(s3LinkAtom);

  useEffect(() => {
    if (!image || !s3Link || !setS3Link) return;

    if (image instanceof File) {
      setImageURL(URL.createObjectURL(image));
    } else {
      getLinkFromS3(image, s3Link, setS3Link).then((res) => {
        if (res.success) {
          setImageURL(res.response as string);
        }
      });
    }
  }, [image, s3Link, setS3Link]);

  return (
    <Dialog
      open={isPreviewing}
      onOpenChange={(isOpen) => setPreviewing(isOpen)}
    >
      <DialogContent className="max-w-[90%] max-h-[90%] h-fit">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage src={imageURL} className="object-fill aspect-ratio" />
        </Avatar>
      </DialogContent>
    </Dialog>
  );
};
