import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";

type Props = {
  isPreviewing: boolean;
  setPreviewing: (isPreviewing: boolean) => void;
  image: File;
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
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result as string);
    };
    reader.readAsDataURL(image);
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
              alt=""
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
