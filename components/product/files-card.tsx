import { FaFileUpload } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileOrCreativeFile } from "@/shared/types/file-preview-types";
import { Dispatch, SetStateAction, useRef } from "react";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";
import { FileUploadButton } from "../utils/file-upload-button";

type Props = {
  isPending: boolean;
  creativeFiles: FileOrCreativeFile[];
  setCreativeFiles: Dispatch<SetStateAction<FileOrCreativeFile[]>>;
};

export const FilesCard = ({
  isPending,
  creativeFiles,
  setCreativeFiles
}: Props) => {
  const hiddenCreativeFileInput = useRef<HTMLInputElement>(null);

  const onCreativeFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).filter(
        (newFile) =>
          !creativeFiles.find(
            (savedFile) =>
              savedFile instanceof File &&
              savedFile.name === newFile.name &&
              savedFile.size === newFile.size &&
              savedFile.lastModified === newFile.lastModified
          )
      );
      setCreativeFiles((prev) => [...prev, ...newFiles]);
    }
    if (hiddenCreativeFileInput.current) {
      hiddenCreativeFileInput.current.value = "";
    }
  };

  const onDeleteCreativeFile = (index: number) => {
    const updatedFiles = [...creativeFiles];
    updatedFiles.splice(index, 1);
    setCreativeFiles(updatedFiles);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Creative Works ({creativeFiles.length})</CardTitle>
        <FileUploadButton disabled={isPending} onChange={onCreativeFileAdded}>
          <FaFileUpload className="text-green-700 text-sm" />
          Upload
        </FileUploadButton>
      </CardHeader>
      <CardContent>
        <div className="min-h-32 flex flex-wrap content-start gap-4">
          {creativeFiles.map((file, index) => (
            <Badge key={index} className="h-8 flex gap-x-2 px-4 rounded-full">
              <p>{file.name}</p>
              <Button
                // asChild
                disabled={isPending}
                variant="link"
                className="p-0 text-base text-black cursor-pointer"
                onClick={() => onDeleteCreativeFile(index)}
              >
                <MdClose />
              </Button>
            </Badge>
          ))}
          {creativeFiles.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <p>No Creative Files selected</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
