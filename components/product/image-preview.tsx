import { Button } from "../ui/button";

type PropsParams = {
  src: string;
}

export const ImagePreview = ({ src }: PropsParams) => {
  return (
    <div className="relative">
      <img src={src} className="h-28" />
      <div className="absolute top-0 right-0 z-10 w-full h-full flex items-center justify-center bg-gray-700/70">
        <div className="flex flex-col items-center gap-y-2">
          <Button variant="outline" className="w-fit h-6 px-1 py-0 bg-transparent hover:bg-transparent hover border border-green-400 text-sm text-white hover:text-white hover:font-bold">
            Preview
          </Button>
          <Button variant="outline" className="w-fit h-6 px-1 py-0 bg-transparent hover:bg-transparent hover border border-red-400 text-sm text-white hover:text-white hover:font-bold">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}