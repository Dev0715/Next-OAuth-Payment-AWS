import { FaFileUpload } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImagePreview } from "./preview-image";
import { FileOrString } from "@/shared/types/file-or-string";

type Props = {
  previewFiles: FileOrString[];
  isPending: boolean;
  onPreviewFile: (index: number) => void;
  onDeletePreviewFile: (index: number) => void;
  onPreviewFileBrowse: () => void;
};

export const PreviewCard = ({
  previewFiles,
  isPending,
  onPreviewFileBrowse,
  onPreviewFile,
  onDeletePreviewFile
}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Preview Images</CardTitle>
        <Button
          type="button"
          className="gap-x-2 border-green-700"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={onPreviewFileBrowse}
        >
          <FaFileUpload />
          Upload
        </Button>
        {/* <CardDescription>You can preview your creative works</CardDescription> */}
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
