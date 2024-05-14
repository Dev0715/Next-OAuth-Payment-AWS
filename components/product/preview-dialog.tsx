import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { FileOrString } from "@/shared/types/file-or-string";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";

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
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (!image) return;
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      getLinkFromS3(image as string).then((res) => {
        if (res.success) {
          setImageURL(res.response as string);
        }
      });
    }
  }, [image]);

  const handleImageLoad = (event: any) => {
    setImageDimensions({
      width: event.target.naturalWidth,
      height: event.target.naturalHeight
    });
  };

  return (
    <Dialog
      open={isPreviewing}
      onOpenChange={(isOpen) => setPreviewing(isOpen)}
    >
      <DialogContent className="max-w-[90%] max-h-[90%]">
        {/* <DialogHeader>
          <DialogTitle>{files[previewIndex as number]?.name}</DialogTitle>
        </DialogHeader> */}
        <div className="max-w-full max-h-full w-fit h-fit overflow-hidden">
          {isPreviewing && (
            <Image
              src={imageURL}
              className="max-w-full max-h-full object-fill"
              width={imageDimensions.width}
              height={imageDimensions.height}
              onLoad={handleImageLoad}
              alt="Preview Image"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
