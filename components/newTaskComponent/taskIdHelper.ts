export function formatTaskId(userId: number, taskId: number): string {
  let taskString = `00${taskId}`; // Default with two leading zeros

  if (taskId >= 100) {
    taskString = taskId.toString(); // Remove both zeros
  } else if (taskId >= 10) {
    taskString = `0${taskId}`; // Remove one zero
  }

  return `TASK${userId}${taskString}`;
}
