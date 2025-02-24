"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
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

  if (props.type === "EDIT") {
    console.log("This is edit task for task id: " + props.taskData!.id);
  } else {
    console.log("This is new task");
  }

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
          <RadioGroup id={"taskPriority"} defaultValue="medium">
            <div className="flex flex-row items-center space-x-2">
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
          <RadioGroup id={"taskStatus"} defaultValue="todo">
            <div className="flex flex-row items-center space-x-2">
              <RadioGroupItem value={"todo"} id={"s1"} />
              <Label htmlFor={"s1"}>To Do</Label>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <RadioGroupItem value={"in_progress"} id={"s2"} />
              <Label htmlFor={"s2"}>In Progress</Label>
            </div>
          </RadioGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
