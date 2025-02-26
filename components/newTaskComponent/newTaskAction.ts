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
  console.log(formData);

  return {
    ...prevState,
    success: true,
  };
};
