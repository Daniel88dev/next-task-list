"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskTableType } from "@/drizzle/taskTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  ListTodo,
  Minus,
  ShieldAlert,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TooltipProvider } from "@/components/ui/tooltip";
import RadioItemWithTooltip from "@/components/RadioItemWithTooltip/RadioItemWithTooltip";

type NewTaskProps = {
  type: "NEW";
  taskButton: string;
};

type EditTaskProps = {
  type: "EDIT";
  taskData?: TaskTableType;
  taskButton: string;
};

type Props = NewTaskProps | EditTaskProps;

const NewTaskDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [finishDate, setFinishDate] = useState<Date | null>(null);

  if (props.type === "EDIT") {
    console.log("This is edit task for task id: " + props.taskData!.id);
  } else {
    console.log("This is new task");
  }

  const onDateSet = (date: Date | undefined) => {
    if (date) {
      setFinishDate(date);
    } else setFinishDate(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>{props.taskButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form>
          <Label htmlFor={"taskTitle"}>Task Title:</Label>
          <Input
            id={"taskTitle"}
            name={"taskTitle"}
            type={"text"}
            maxLength={50}
          />
          <Label htmlFor={"taskDescription"}>Description:</Label>
          <Textarea id={"taskDescription"} name={"taskDescription"} />
          <Label htmlFor={"taskPriority"}>Priority:</Label>
          <TooltipProvider>
            <RadioGroup
              className={"grid grid-cols-4 gap-2 w-48"}
              id={"taskPriority"}
              defaultValue="medium"
            >
              <RadioItemWithTooltip
                key={"r1"}
                radioId={"r1"}
                radioValue={"low"}
                toolTipText={"Low"}
                labelClassName={"p-0"}
              >
                <ChevronDown />
              </RadioItemWithTooltip>
              <RadioItemWithTooltip
                key={"r2"}
                radioId={"r2"}
                radioValue={"medium"}
                toolTipText={"Medium"}
                labelClassName={"p-0"}
              >
                <Minus />
              </RadioItemWithTooltip>
              <RadioItemWithTooltip
                key={"r3"}
                radioId={"r3"}
                radioValue={"high"}
                toolTipText={"High"}
                labelClassName={"p-0"}
              >
                <ChevronUp />
              </RadioItemWithTooltip>
              <RadioItemWithTooltip
                key={"r4"}
                radioId={"r4"}
                radioValue={"urgent"}
                toolTipText={"Urgent"}
                labelClassName={"p-0 text-red-500"}
              >
                <ShieldAlert />
              </RadioItemWithTooltip>
            </RadioGroup>
          </TooltipProvider>
          <Label htmlFor={"taskStatus"}>Status</Label>
          <TooltipProvider>
            <RadioGroup
              className={"grid grid-cols-4 gap-2 w-48"}
              id={"taskStatus"}
              defaultValue="todo"
            >
              <RadioItemWithTooltip
                radioId={"s1"}
                radioValue={"todo"}
                toolTipText={"To Do"}
                labelClassName={"p-0"}
              >
                <ListTodo />
              </RadioItemWithTooltip>
              <RadioItemWithTooltip
                radioId={"s2"}
                radioValue={"in_progress"}
                toolTipText={"In Progress"}
                labelClassName={"p-0"}
              >
                <Ellipsis />
              </RadioItemWithTooltip>
            </RadioGroup>
          </TooltipProvider>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !finishDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {finishDate ? (
                  format(finishDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={finishDate ?? new Date()}
                onSelect={onDateSet}
                initialFocus
                required={false}
              />
            </PopoverContent>
          </Popover>
          <DialogFooter>
            <Button type={"submit"}>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
