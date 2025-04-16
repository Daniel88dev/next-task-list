import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DefaultUserIcon = () => {
  return (
    <Avatar className="w-7 h-7 mt-1">
      <AvatarImage />
      <AvatarFallback />
    </Avatar>
  );
};

export default DefaultUserIcon;
