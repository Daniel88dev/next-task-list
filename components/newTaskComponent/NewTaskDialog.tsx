"use client";
import { useActionState, useState } from "react";
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
import { RadioGroup } from "@/components/ui/radio-group";
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
import {
  NewTaskActionType,
  submitNewTask,
} from "@/components/newTaskComponent/newTaskAction";

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

type State = {
  priority: string;
  status: string;
  targetDate: Date | null;
};

const NewTaskDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<State>({
    priority: "medium",
    status: "todo",
    targetDate: null,
  });

  if (props.type === "EDIT") {
    console.log("This is edit task for task id: " + props.taskData!.id);
  } else {
    console.log("This is new task");
  }

  const [newTaskFormState, newTaskFormAction] = useActionState(submitNewTask, {
    type: props.type,
    success: false,
    errors: null,
  } as NewTaskActionType);

  console.log(newTaskFormState);

  const onDateSet = (date: Date | undefined) => {
    if (date) {
      setData((prevState) => {
        return {
          ...prevState,
          targetDate: date,
        };
      });
    } else
      setData((prevState) => {
        return {
          ...prevState,
          targetDate: null,
        };
      });
  };

  const onPriorityChange = (value: string) => {
    setData((prevState) => {
      return {
        ...prevState,
        priority: value,
      };
    });
  };

  const onStatusChange = (value: string) => {
    setData((prevState) => {
      return {
        ...prevState,
        status: value,
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>{props.taskButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-2xl"}>Create New Task</DialogTitle>
        </DialogHeader>
        <form className={"flex flex-col"} action={newTaskFormAction}>
          <div className={"py-4"}>
            <Label htmlFor={"taskTitle"} className={"text-lg"}>
              Task Title:
            </Label>
            <Input
              id={"taskTitle"}
              name={"taskTitle"}
              type={"text"}
              maxLength={50}
            />
          </div>
          <div className={"py-4"}>
            <Label htmlFor={"taskDescription"} className={"text-lg"}>
              Description:
            </Label>
            <Textarea id={"taskDescription"} name={"taskDescription"} />
          </div>
          <div className={"py-4"}>
            <Label htmlFor={"taskPriority"} className={"text-lg"}>
              Priority:
            </Label>
            <TooltipProvider>
              <RadioGroup
                className={"grid grid-cols-4 gap-2 w-48"}
                id={"taskPriority"}
                defaultValue={data.priority}
                onValueChange={onPriorityChange}
              >
                <RadioItemWithTooltip
                  key={"r1"}
                  radioId={"r1"}
                  radioValue={"low"}
                  toolTipText={"Low"}
                  labelClassName={"p-0 h-8 py-2"}
                >
                  <ChevronDown size={16} />
                </RadioItemWithTooltip>
                <RadioItemWithTooltip
                  key={"r2"}
                  radioId={"r2"}
                  radioValue={"medium"}
                  toolTipText={"Medium"}
                  labelClassName={"p-0 h-8 py-2"}
                >
                  <Minus size={16} />
                </RadioItemWithTooltip>
                <RadioItemWithTooltip
                  key={"r3"}
                  radioId={"r3"}
                  radioValue={"high"}
                  toolTipText={"High"}
                  labelClassName={"p-0 h-8 py-2"}
                >
                  <ChevronUp size={16} />
                </RadioItemWithTooltip>
                <RadioItemWithTooltip
                  key={"r4"}
                  radioId={"r4"}
                  radioValue={"urgent"}
                  toolTipText={"Urgent"}
                  labelClassName={"p-0 text-red-500 h-8 py-2"}
                >
                  <ShieldAlert size={16} />
                </RadioItemWithTooltip>
              </RadioGroup>
            </TooltipProvider>
          </div>
          <div className={"py-4"}>
            <Label htmlFor={"taskStatus"} className={"text-lg"}>
              Status:
            </Label>
            <TooltipProvider>
              <RadioGroup
                className={"grid grid-cols-4 gap-2 w-48"}
                id={"taskStatus"}
                defaultValue={data.status}
                onValueChange={onStatusChange}
              >
                <RadioItemWithTooltip
                  radioId={"s1"}
                  radioValue={"todo"}
                  toolTipText={"To Do"}
                  labelClassName={"p-0 h-8 py-2"}
                >
                  <ListTodo size={16} />
                </RadioItemWithTooltip>
                <RadioItemWithTooltip
                  radioId={"s2"}
                  radioValue={"in_progress"}
                  toolTipText={"In Progress"}
                  labelClassName={"p-0 h-8 py-2"}
                >
                  <Ellipsis size={16} />
                </RadioItemWithTooltip>
              </RadioGroup>
            </TooltipProvider>
          </div>
          <div className={"py-4"}>
            <Label className={"text-lg"}>Finish Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !data.targetDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.targetDate ? (
                    format(data.targetDate, "PPP")
                  ) : (
                    <span>Pick a Finish Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.targetDate ?? new Date()}
                  onSelect={onDateSet}
                  initialFocus
                  required={false}
                />
              </PopoverContent>
            </Popover>
          </div>
          <input
            type={"hidden"}
            name={"priority"}
            value={data.priority}
            readOnly
          />
          <input type={"hidden"} name={"status"} value={data.status} readOnly />
          <input
            type={"hidden"}
            name={"targetDate"}
            value={data.targetDate?.toISOString().split("T")[0] ?? "none"}
            readOnly
          />
          <DialogFooter>
            <Button type={"submit"}>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
