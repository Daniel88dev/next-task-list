"use server";

export type NewTaskActionType = {
  type: "NEW";
  success: boolean;
  errors: null | {
    [key: string]: string | undefined;
  };
};

export const submitNewTask = async (
  prevState: NewTaskActionType,
  formData: FormData
) => {
  const taskTitle = formData.get("taskTitle");
  const taskDescription = formData.get("taskDescription");
  const priority = formData.get("priority");
  const status = formData.get("status");
  const dueDate = formData.get("targetDate") as string;

  const targetDate: Date | null =
    !dueDate || dueDate === "none" ? null : new Date(dueDate);

  console.table({
    taskTitle,
    taskDescription,
    priority,
    status,
    targetDate,
    dueDate,
  });

  console.log(targetDate);

  return {
    ...prevState,
    success: true,
  };
};
