"use server";

import { increaseUserTaskId } from "@/drizzle/user";

export const testFunction = async () => {
  const test = await increaseUserTaskId(3);
  console.log(test);
};
