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

type NewTaskProps = {
  type: "NEW";
};

type EditTaskProps = {
  type: "EDIT";
  taskData?: TaskTableType;
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
        <Button onClick={() => setOpen(true)}>Create New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <h1>New Task</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
