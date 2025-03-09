"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskTableType } from "@/drizzle/taskTable";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  editTaskComment,
  SubmitEditTaskCommentStateType,
} from "@/app/(auth)/tasks/taskActions";
import { toast } from "sonner";

const EditTaskDescriptionDialog = ({ task }: { task: TaskTableType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = (value: boolean) => {
    setOpen(value);
    router.back();
  };

  const [editDescriptionState, editDescriptionFormAction] = useActionState(
    editTaskComment,
    {
      errors: null,
      success: false,
      taskId: task.id,
    } as SubmitEditTaskCommentStateType
  );

  useEffect(() => {
    if (editDescriptionState.errors) {
      toast.error("Failed to update Description", {
        style: { background: "red" },
      });
    } else if (editDescriptionState.success && open) {
      toast.success(
        `Description of task: ${task.taskUserId} updated successfully`
      );
      handleClose(false);
    }
  }, [editDescriptionState]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Description</DialogTitle>
          <DialogDescription>Task ID: {task.taskUserId}</DialogDescription>
          <DialogDescription>Task: {task.title}</DialogDescription>
        </DialogHeader>
        <form action={editDescriptionFormAction}>
          <Textarea
            defaultValue={task.description ?? ""}
            rows={5}
            name={"description"}
          />
          <DialogFooter className={"py-4"}>
            <Button type={"submit"}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDescriptionDialog;
