import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImagePreview } from "./image-preview";

type Props = {
  previewFiles: File[];
  isPending: boolean;
  onPreviewFile: (index: number) => void;
  onDeletePreviewFile: (index: number) => void;
};

export const PreviewCard = ({
  previewFiles,
  isPending,
  onPreviewFile,
  onDeletePreviewFile
}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Preview Images</CardTitle>
        {/* <CardDescription>You can preview your creative works</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap gap-4">
          {previewFiles.map((file, index) => (
            <ImagePreview
              key={file.name}
              disabled={isPending}
              image={file}
              onPreview={() => onPreviewFile(index)}
              onDelete={() => onDeletePreviewFile(index)}
            />
          ))}
          {previewFiles.length === 0 && (
            <div className="w-full h-64 flex items-center justify-center">
              <p>No Preview Images selected</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
