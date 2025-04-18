"use client";

import { useState } from "react";
import { Home, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bar,
  BarChart as Chart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
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
  ]);

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemType, setNewItemType] = useState("task");
  const [activeTab, setActiveTab] = useState("all");

  const chartData = [
    { name: "Jan", total: 12 },
    { name: "Feb", total: 8 },
    { name: "Mar", total: 15 },
    { name: "Apr", total: 20 },
    { name: "May", total: 14 },
    { name: "Jun", total: 18 },
  ];

  const addNewItem = () => {
    if (newItemTitle.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: newItemTitle,
        completed: false,
        type: newItemType,
      },
    ]);

    setNewItemTitle("");
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return !task.completed;
    return !task.completed && task.type === activeTab;
  });

  const userName = "Alex";

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <span className="text-lg font-semibold">TaskDash</span>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Welcome back, {userName}!
                </CardTitle>
                <CardDescription>
                  Here's an overview of your tasks and shopping list
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Current Tasks</CardTitle>
                  <CardDescription>
                    You have {filteredTasks.length} open items
                  </CardDescription>
                </div>
                <Tabs
                  defaultValue="all"
                  className="ml-auto"
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="task">Tasks</TabsTrigger>
                    <TabsTrigger value="shopping">Shopping</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                        >
                          <div className="flex items-center space-x-4">
                            <Checkbox
                              id={`task-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() =>
                                toggleTaskCompletion(task.id)
                              }
                            />
                            <div className="grid gap-1">
                              <Label htmlFor={`task-${task.id}`}>
                                {task.title}
                              </Label>
                            </div>
                          </div>
                          <Badge
                            variant={
                              task.type === "task" ? "default" : "secondary"
                            }
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
                    <Chart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar
                        dataKey="total"
                        fill="#6366f1"
                        radius={[4, 4, 0, 0]}
                      />
                    </Chart>
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
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="w-full md:w-[180px]">
                    <Label htmlFor="item-type">Item Type</Label>
                    <Select value={newItemType} onValueChange={setNewItemType}>
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
                <Button onClick={addNewItem}>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
