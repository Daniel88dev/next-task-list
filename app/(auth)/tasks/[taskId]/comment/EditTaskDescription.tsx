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

const EditTaskDescription = ({ task }: { task: TaskTableType }) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>Edit Task Description</CardTitle>
          <CardDescription>Task ID: {task.taskUserId}</CardDescription>
          <CardDescription>Task Title: {task.title}</CardDescription>
        </CardHeader>
        <form>
          <Textarea defaultValue={task.description ?? ""} rows={5} />
          <CardFooter className={"py-4"}>
            <Button type={"submit"}>Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTaskDescription;
