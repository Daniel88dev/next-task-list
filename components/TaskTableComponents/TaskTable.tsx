import { TaskTableType } from "@/drizzle/taskTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

type Props = {
  tasks: TaskTableType[];
};

const TaskTable = ({ tasks }: Props) => {
  return (
    <div className={"space-y-4"}>
      <div className={"rounded-md border"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((taskRecord) => (
              <TableRow key={`taskRecord-${taskRecord.id}`}>
                <TableCell>{taskRecord.title}</TableCell>
                <TableCell>{taskRecord.description}</TableCell>
                <TableCell>{taskRecord.priority}</TableCell>
                <TableCell>
                  {taskRecord.dueDate
                    ? format(taskRecord.dueDate, "PPP")
                    : "No Date selected"}
                </TableCell>
                <TableCell>{taskRecord.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTable;
