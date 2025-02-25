import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  radioId: string;
  radioValue: string;
  toolTipText: string;
  labelClassName?: string;
};

const RadioItemWithTooltip = ({
  children,
  radioId,
  radioValue,
  toolTipText,
  labelClassName,
}: Props) => {
  return (
    <div>
      <RadioGroupItem
        value={radioValue}
        id={radioId}
        className="peer sr-only"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Label
            htmlFor={radioId}
            className={cn(
              "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
              labelClassName
            )}
          >
            {children}
          </Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default RadioItemWithTooltip;
