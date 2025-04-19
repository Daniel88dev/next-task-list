import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { SimpleTaskType } from "@/drizzle/taskTable";
import { SimpleShoppingItemType } from "@/drizzle/shoppingList";

type Props = {
  userTasks: SimpleTaskType[];
  userTaskCount: number;
  userShoppingCount: number;
  userShoppingItems: SimpleShoppingItemType[];
};

const TabsTaskView = ({
  userTasks,
  userTaskCount,
  userShoppingCount,
  userShoppingItems,
}: Props) => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Card className="md:col-span-2">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Current Tasks</CardTitle>
            <CardDescription>
              You have {userTaskCount} open tasks and {userShoppingCount} items
              in your shopping list.
            </CardDescription>
          </div>

          <TabsList className={"ml-auto"}>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="task">Tasks</TabsTrigger>
            <TabsTrigger value="shopping">Shopping</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <TabsContent value={"all"}>
              <div className="space-y-4">
                {userTasks.length > 0 ? (
                  userTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => {}}
                        />
                        <div className="grid gap-1">
                          <Label htmlFor={`task-${task.id}`}>
                            {task.title}
                          </Label>
                        </div>
                      </div>
                      <Badge
                        variant={task.type === "task" ? "default" : "secondary"}
                      >
                        {task.type === "task" ? "Task" : "Shopping"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 className="text-2xl font-bold tracking-tight">
                        No items found
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Create a new item to get started.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value={"task"}>
              <h1>tasks</h1>
            </TabsContent>
            <TabsContent value={"shopping"}>
              <h1>Shopping</h1>
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default TabsTaskView;
