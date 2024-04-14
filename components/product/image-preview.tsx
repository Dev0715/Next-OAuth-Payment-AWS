import { Button } from "../ui/button";

type PropsParams = {
  src: string;
}

export const ImagePreview = ({ src }: PropsParams) => {
  return (
    <div className="relative">
      <img src={src} className="h-28" />
      <div className="absolute top-0 right-0 z-10 w-full h-full flex items-center justify-center bg-gray-700/50">
        <div className="flex flex-col">
          <Button variant="link" className="h-6 p-0 text-sm text-white">
            Preview
          </Button>
          <Button variant="link" className="h-6 p-0 text-sm text-white">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}