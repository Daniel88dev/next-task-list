"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskTableType } from "@/drizzle/taskTable";
import { useRouter } from "next/navigation";

const EditTaskDescriptionDialog = ({ task }: { task: TaskTableType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = (value: boolean) => {
    setOpen(value);
    router.back();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Description</DialogTitle>
          <DialogDescription>Task ID: {task.taskUserId}</DialogDescription>
          <DialogDescription>Task: {task.title}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDescriptionDialog;
