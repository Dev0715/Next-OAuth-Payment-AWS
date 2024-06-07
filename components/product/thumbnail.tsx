import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Thumbnail = (props: {
  path: string;
  focused: boolean;
  onItemSelected: () => void;
}) => {
  return (
    <div
      onMouseEnter={props.onItemSelected}
      className={`w-28 h-16 border-[2px] cursor-pointer ${props.focused && "border-green-700"}`}
    >
      <Avatar className={`w-full h-full border-[1px] border-white`}>
        <AvatarImage src={props.path} className="object-center object-fill" />
        <AvatarFallback className="bg-sky-500">
          <div className="w-full h-full bg-inherit"></div>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
