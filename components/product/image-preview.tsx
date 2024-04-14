type PropsParams = {
  src: string;
}

export const ImagePreview = ({ src }: PropsParams) => {
  return (
    <img src={src} className="h-28" />
  )
}