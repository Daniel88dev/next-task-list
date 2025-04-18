"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "@/components/ui/charts";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DashboardPage = () => {
  const userName = "Daniel";
  const [activeTab, setActiveTab] = useState("all");
  const chartData = [
    { name: "Jan", total: 12 },
    { name: "Feb", total: 8 },
    { name: "Mar", total: 15 },
    { name: "Apr", total: 20 },
    { name: "May", total: 14 },
    { name: "Jun", total: 18 },
  ];

  const tasks = [
    {
      id: 1,
      title: "Complete project proposal",
      completed: false,
      type: "task",
    },
    { id: 2, title: "Review client feedback", completed: false, type: "task" },
    { id: 3, title: "Schedule team meeting", completed: false, type: "task" },
    { id: 4, title: "Milk", completed: false, type: "shopping" },
    { id: 5, title: "Bread", completed: false, type: "shopping" },
    { id: 6, title: "Eggs", completed: false, type: "shopping" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Welcome back, {userName}!</CardTitle>
          </CardHeader>
          <CardDescription>
            Here&#39;s an overview of your tasks and shopping list
          </CardDescription>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Current Tasks</CardTitle>
              <CardDescription>You have 7 open items</CardDescription>
              <Tabs
                defaultValue={activeTab}
                className="ml-auto"
                onValueChange={setActiveTab}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="task">Tasks</TabsTrigger>
                  <TabsTrigger value="shopping">Shopping</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
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
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Create New Item</CardTitle>
            <CardDescription>
              Add a new task or shopping item to your list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <Label htmlFor="new-item">Item Title</Label>
                <Input
                  id="new-item"
                  placeholder="Enter item title..."
                  value={""}
                  className="mt-1"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Label htmlFor="item-type">Item Type</Label>
                <Select value={""}>
                  <SelectTrigger id="item-type" className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="shopping">Shopping Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Clear</Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
