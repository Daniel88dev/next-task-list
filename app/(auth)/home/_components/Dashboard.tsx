"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { SimpleTaskType } from "@/drizzle/taskTable";
import { SimpleShoppingItemType } from "@/drizzle/shoppingList";
import TabsTaskView from "@/app/(auth)/home/_components/TabsTaskView";

type Props = {
  firstName: string;
  userTasks: SimpleTaskType[];
  userTaskCount: number;
  userShoppingCount: number;
  userShoppingItems: SimpleShoppingItemType[];
};

const DashboardPage = ({
  firstName,
  userTasks,
  userTaskCount,
  userShoppingCount,
  userShoppingItems,
}: Props) => {
  const chartData = [
    { name: "Jan", total: 12 },
    { name: "Feb", total: 8 },
    { name: "Mar", total: 15 },
    { name: "Apr", total: 20 },
    { name: "May", total: 14 },
    { name: "Jun", total: 18 },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Welcome back, {firstName}!</CardTitle>
            <CardDescription>
              Here&#39;s an overview of your tasks and shopping list
            </CardDescription>
          </CardHeader>
        </Card>
        <TabsTaskView
          userTasks={userTasks}
          userTaskCount={userTaskCount}
          userShoppingCount={userShoppingCount}
          userShoppingItems={userShoppingItems}
        />

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
