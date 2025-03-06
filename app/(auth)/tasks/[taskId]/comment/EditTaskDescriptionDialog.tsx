"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskTableType } from "@/drizzle/taskTable";

const EditTaskDescriptionDialog = ({ task }: { task: TaskTableType }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        Edit Description
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Description</DialogTitle>
          <DialogDescription>Task: {task.title}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDescriptionDialog;
