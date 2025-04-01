"use client";

import { TaskTableType } from "@/drizzle/taskTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import {
  editTaskComment,
  SubmitEditTaskCommentStateType,
} from "@/app/(auth)/tasks/taskActions";
import { toast } from "sonner";

const EditTaskDescription = ({ task }: { task: TaskTableType }) => {
  const navigate = useRouter();

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
    } else if (editDescriptionState.success) {
      toast.success(
        `Description of task: ${task.taskUserId} updated successfully`
      );
      navigate.push("/tasks");
    }
  }, [editDescriptionState, navigate, task.taskUserId]);

  return (
    <Card className={"w-[700px] mx-auto"}>
      <CardContent>
        <CardHeader>
          <CardTitle>Edit Task Description</CardTitle>
          <CardDescription>Task ID: {task.taskUserId}</CardDescription>
          <CardDescription>Task Title: {task.title}</CardDescription>
        </CardHeader>
        <form action={editDescriptionFormAction}>
          <Textarea
            defaultValue={task.description ?? ""}
            rows={5}
            name={"description"}
          />
          <CardFooter className={"py-4"}>
            <Button type={"submit"}>Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTaskDescription;
