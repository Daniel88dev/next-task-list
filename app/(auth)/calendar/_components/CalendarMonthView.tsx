"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export interface CalendarTask {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: "pending" | "in-progress" | "completed";
}

// const initialTasks: CalendarTask[] = [
//   {
//     id: "1",
//     title: "Project Proposal",
//     description: "Finish the project proposal document",
//     deadline: new Date(2025, 3, 25, 14, 0),
//     status: "pending",
//   },
//   {
//     id: "2",
//     title: "Team Meeting",
//     description: "Weekly team sync",
//     deadline: new Date(2025, 3, 22, 10, 0),
//     status: "pending",
//   },
//   {
//     id: "3",
//     title: "Client Presentation",
//     description: "Prepare slides for client presentation",
//     deadline: new Date(2025, 3, 28, 15, 30),
//     status: "pending",
//   },
//   {
//     id: "4",
//     title: "Budget Review",
//     description: "Review Q2 budget with finance team",
//     deadline: new Date(2025, 3, 15, 11, 0),
//     status: "completed",
//   },
// ];

const CalendarMonthView = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const usFirstDay = firstDayOfMonth.getDay();
  const firstDayOfWeek = (usFirstDay === 0 ? 7 : usFirstDay) - 1;

  const monthYearString = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const calendarDays = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className={"h-32 border bg-muted/20"}></div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    // const dayTask
    const isToday =
      day === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear();

    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`h-32 border p-1 ${isToday ? "bg-primary/10" : ""}`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
              isToday ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            {day}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>
        <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
          {/*  task items goes there*/}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{monthYearString}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center font-medium border-b">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    </div>
  );
};

export default CalendarMonthView;
