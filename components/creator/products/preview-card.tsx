import { Dispatch, SetStateAction, useState } from "react";
import { FaFileUpload } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploadButton } from "@/components/utils/file-upload-button";
import { FileOrString } from "@/shared/types/file-preview-types";

import { PreviewDialog } from "./preview-dialog";
import { ImagePreview } from "./preview-image";

type Props = {
  isPending: boolean;
  previewFiles: FileOrString[];
  setPreviewFiles: Dispatch<SetStateAction<FileOrString[]>>;
};

export const PreviewCard = ({
  isPending,
  previewFiles,
  setPreviewFiles
}: Props) => {
  const [previewIndex, setPreviewIndex] = useState<number>();
  const [isPreviewing, setPreviewing] = useState<boolean>(false);

  const onPreviewFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).filter(
        (newFile) =>
          !previewFiles.find(
            (savedFile) =>
              savedFile instanceof File &&
              savedFile.name === newFile.name &&
              savedFile.size === newFile.size &&
              savedFile.lastModified === newFile.lastModified
          )
      );
      setPreviewFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const onDeletePreviewFile = (index: number) => {
    const updatedFiles = [...previewFiles];
    updatedFiles.splice(index, 1);
    setPreviewFiles(updatedFiles);
  };

  const onPreviewFile = (index: number) => {
    setPreviewing(true);
    setPreviewIndex(index);
  };

  return (
    <Card className="w-full rounded-3xl font-firs">
      {/** Preview is not working with images whose width < height  */}
      <PreviewDialog
        isPreviewing={isPreviewing}
        setPreviewing={setPreviewing}
        image={previewFiles[previewIndex as number]}
      />
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Preview Images ({previewFiles.length})</CardTitle>
        <FileUploadButton disabled={isPending} onChange={onPreviewFileAdded}>
          <FaFileUpload className="text-sm" />
          Upload
        </FileUploadButton>
      </CardHeader>
      <CardContent>
        <div className="min-h-32 flex flex-row flex-wrap gap-4">
          {previewFiles.map((file, index) => (
            <ImagePreview
              key={file instanceof File ? file.name : file}
              disabled={isPending}
              image={file}
              onPreview={() => onPreviewFile(index)}
              onDelete={() => onDeletePreviewFile(index)}
            />
          ))}
          {previewFiles.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <p>No Preview Images selected</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
