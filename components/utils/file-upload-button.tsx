import { useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  disabled: boolean;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileUploadButton = ({ disabled, children, onChange }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onFileBrowse = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <>
      <Input
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        ref={hiddenFileInput}
        onChange={onChange}
      />
      <Button
        type="button"
        className="gap-x-2 border-green-700 rounded-none"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={onFileBrowse}
      >
        {children}
      </Button>
    </>
  );
};
