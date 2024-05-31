import { useRef } from "react";

import { Input } from "@/components/ui/input";

import { GradientButton } from "./gradient-button";

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
      <GradientButton
        type="button"
        className="gap-x-2 py-2"
        size="sm"
        disabled={disabled}
        onClick={onFileBrowse}
      >
        {children}
      </GradientButton>
    </>
  );
};
