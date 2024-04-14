import { Button } from "../ui/button";

type PropsParams = {
  src: string;
}

export const ImagePreview = ({ src }: PropsParams) => {
  return (
    <div className="relative">
      <img src={src} className="h-28" />
      <div className="absolute top-0 right-0 z-10 w-full h-full bg-gray-700/50">
        <Button variant="link">
          Preview
        </Button>
        <Button variant="outline">
          Preview
        </Button>
      </div>
    </div>
  )
}