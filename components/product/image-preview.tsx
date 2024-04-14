import { Button } from "../ui/button";

type PropsParams = {
  src: string;
}

export const ImagePreview = ({ src }: PropsParams) => {
  return (
    <div className="relative">
      <img src={src} className="h-28" />
      <div className="absolute top-0 right-0 z-10 w-full h-full flex items-center justify-center bg-gray-700/50">
        <div className="flex flex-col items-center">
          <Button variant="outline" className="w-fit h-6 p-0 bg-transparent text-sm text-white">
            Preview
          </Button>
          <Button variant="outline" className="w-fit h-6 p-0 bg-transparent text-sm text-white">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}