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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

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
          <RadioGroup
            className={"flex"}
            id={"taskPriority"}
            defaultValue="medium"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="r1" />
              <Label htmlFor="r1">Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="r2" />
              <Label htmlFor="r2">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="r3" />
              <Label htmlFor="r3">High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="r3" />
              <Label htmlFor="r3">Urgent</Label>
            </div>
          </RadioGroup>
          <Label htmlFor={"taskStatus"}>Status</Label>
          <RadioGroup className={"flex"} id={"taskStatus"} defaultValue="todo">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"todo"} id={"s1"} />
              <Label htmlFor={"s1"}>To Do</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"in_progress"} id={"s2"} />
              <Label htmlFor={"s2"}>In Progress</Label>
            </div>
          </RadioGroup>
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
