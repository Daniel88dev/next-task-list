import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DefaultUserIcon = () => {
  return (
    <Avatar className="w-7 h-7 mt-1">
      <AvatarImage src={"/user.png"} />
      <AvatarFallback />
    </Avatar>
  );
};

export default DefaultUserIcon;
