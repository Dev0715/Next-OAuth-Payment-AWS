import { FaFileUpload } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImagePreview } from "./preview-image";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";

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
  return (
    <Card className="mb-6 w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Creative Works</CardTitle>
        <Input
          className="hidden"
          type="file"
          // accept="image/*"
          multiple
          ref={hiddenCreativeFileInput}
          onChange={onCreativeFileAdded}
        />
        <Button
          type="button"
          className="gap-x-2 border-green-700"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={onCreativeFileBrowse}
        >
          <FaFileUpload />
          Upload
        </Button>
      </CardHeader>
      <CardContent>
        <div className="min-h-32 flex flex-wrap gap-4">
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
