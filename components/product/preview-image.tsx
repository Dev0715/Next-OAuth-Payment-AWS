import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FileOrString } from "@/shared/types/file-preview-types";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";

type Props = {
  disabled: boolean;
  image: FileOrString;
  onPreview: () => void;
  onDelete: () => void;
};

export const ImagePreview = ({
  disabled,
  image,
  onPreview,
  onDelete
}: Props) => {
  const [isHover, setHover] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");
  const { getLinkFromS3 } = useLinkFromS3();

  useEffect(() => {
    if (!image || !getLinkFromS3) return;

    if (image instanceof File) {
      setImageURL(URL.createObjectURL(image));
    } else {
      getLinkFromS3(image).then((res) => {
        if (res.success) {
          setImageURL(res.response as string);
        }
      });
    }
  }, [image, getLinkFromS3]);

  return (
    <div
      className="relative h-fit cursor-pointer"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Avatar className="w-auto h-28 rounded-none">
        <AvatarImage src={imageURL} className="object-fill aspect-ratio" />
      </Avatar>

      <div
        className={`absolute top-0 right-0 z-10 w-full h-full flex items-center justify-center bg-gray-700/70 ${!isHover && "hidden"}`}
      >
        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            className="w-fit h-6 px-1 py-0 bg-transparent hover:bg-transparent rounded-none border-0 hover:border-b-2 border-green-400 text-sm text-white hover:text-white"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button
            disabled={disabled}
            variant="outline"
            className="w-fit h-6 px-1 py-0 bg-transparent hover:bg-transparent rounded-none border-0 hover:border-b-2 border-red-400 text-sm text-white hover:text-white"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
