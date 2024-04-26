import { useState } from "react";
import { Button } from "../ui/button";

type PropsParams = {
  disabled: boolean;
  src: string;
  onPreview: () => void;
  onDelete: () => void;
};

export const ImagePreview = ({
  disabled,
  src,
  onPreview,
  onDelete
}: PropsParams) => {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <img src={src} className="h-28" />
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
