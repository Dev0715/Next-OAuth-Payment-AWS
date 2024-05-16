import { useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  disabled: boolean;
  children: React.ReactNode;
};

export const FileUploadButton = ({}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        ref={hiddenFileInput}
        onChange={onPreviewFileAdded}
      />
      <Button
        type="button"
        className="gap-x-2 border-green-700 rounded-none"
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={onPreviewFileBrowse}
      >
        <FaFileUpload className="text-green-700 text-sm" />
        Upload
      </Button>
    </>
  );
};
