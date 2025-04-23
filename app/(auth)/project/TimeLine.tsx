"use client";

import { Circle, Triangle } from "lucide-react";
import { useState } from "react";

type MilestoneType = "circle" | "circle-filled" | "square" | "triangle" | "end";
type MilestoneStatus = "active" | "completed" | "pending";
type ConnectorType = "line" | "none";

interface Milestone {
  id: number;
  name: string;
  date: string;
  type: MilestoneType;
  status: MilestoneStatus;
  connector: ConnectorType;
}

interface TimelineData {
  title: string;
  milestones: Milestone[];
}

export default function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineData>({
    title: "Schedule",
    milestones: [
      {
        id: 1,
        name: "Prepare PR",
        date: "3/15",
        type: "circle-filled",
        status: "active",
        connector: "line",
      },
      {
        id: 2,
        name: "Make PO",
        date: "4/15",
        type: "circle",
        status: "pending",
        connector: "line",
      },
      {
        id: 3,
        name: "Design",
        date: "5/15",
        type: "circle",
        status: "pending",
        connector: "line",
      },
      {
        id: 4,
        name: "Manufacturing",
        date: "6/15",
        type: "circle",
        status: "pending",
        connector: "line",
      },
      {
        id: 5,
        name: "OLT",
        date: "8/18",
        type: "square",
        status: "pending",
        connector: "line",
      },
      {
        id: 6,
        name: "",
        date: "9/12",
        type: "circle",
        status: "pending",
        connector: "line",
      },
      {
        id: 7,
        name: "Shipping",
        date: "12/10",
        type: "circle",
        status: "pending",
        connector: "line",
      },
      {
        id: 8,
        name: "install",
        date: "12/25 (WSD)",
        type: "square",
        status: "pending",
        connector: "line",
      },
      {
        id: 9,
        name: "T1",
        date: "6/15",
        type: "triangle",
        status: "pending",
        connector: "line",
      },
      {
        id: 10,
        name: "LP2",
        date: "8/15",
        type: "triangle",
        status: "pending",
        connector: "line",
      },
      {
        id: 11,
        name: "M",
        date: "26' 11/1",
        type: "circle",
        status: "pending",
        connector: "line",
      },
      {
        id: 12,
        name: "SOP",
        date: "",
        type: "end",
        status: "pending",
        connector: "none",
      },
    ],
  });

  const onMileStoneChange = (milestone: Milestone) => {
    setTimelineData((prevState) => {
      const mileStoneArray: Milestone[] = prevState.milestones.map((record) => {
        if (milestone.id === record.id) {
          return milestone;
        } else {
          return record;
        }
      });
      return {
        ...prevState,
        milestones: mileStoneArray,
      };
    });
  };
  // Find the index of the last active milestone
  const lastActiveIndex = timelineData.milestones.reduce(
    (lastIndex, milestone, index) => {
      return milestone.status === "active" ? index : lastIndex;
    },
    -1
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex">
          {/* Title column */}
          <div className="w-32 bg-stone-100 p-4 flex items-center">
            <h3 className="text-xl font-bold text-stone-800">
              {timelineData.title}
            </h3>
          </div>

          {/* Timeline column */}
          <div className="flex-1 relative">
            {/* Single continuous line - positioned with higher z-index */}
            <div className="absolute h-[2px] bg-gray-400 top-[100px] left-[80px] right-0 z-5" />

            {/* Active portion of the line */}
            {lastActiveIndex >= 0 && (
              <div
                className="absolute h-[2px] bg-blue-600 top-[100px] left-[80px] z-5"
                style={{
                  width: `calc(${
                    ((lastActiveIndex + 1) / timelineData.milestones.length) *
                    100
                  }% - ${
                    timelineData.milestones.length > 1
                      ? ((lastActiveIndex + 1) /
                          timelineData.milestones.length) *
                        32
                      : 0
                  }px)`,
                }}
              />
            )}

            {/* Triangle marker for the active milestone */}
            {lastActiveIndex >= 0 && (
              <div
                className="absolute w-0 h-0 z-10"
                style={{
                  top: "95px",
                  left: `calc(${
                    ((lastActiveIndex + 0.5) / timelineData.milestones.length) *
                    100
                  }% - 8px)`,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "8px solid #2563eb",
                }}
              />
            )}

            <div className="flex items-center relative">
              {timelineData.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex flex-col items-center relative"
                  onClick={() => onMileStoneChange(milestone)}
                  style={{
                    flexGrow: 1,
                    flexBasis: 0,
                  }}
                >
                  {/* Milestone name */}
                  <div className="h-20 flex items-center justify-center px-1">
                    <span className="text-center text-sm font-medium">
                      {milestone.name}
                    </span>
                  </div>

                  {/* Milestone marker */}
                  <div className="h-10 flex items-center justify-center relative">
                    <MilestoneMarker
                      type={milestone.type}
                      status={milestone.status}
                    />
                  </div>

                  {/* Date */}
                  <div className="h-10 flex items-center justify-center mt-1">
                    <span className="text-xs text-gray-600">
                      {milestone.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MilestoneMarker({
  type,
  status,
}: {
  type: MilestoneType;
  status: MilestoneStatus;
}) {
  const getStatusClasses = () => {
    switch (status) {
      case "active":
        return "text-blue-600 border-blue-600";
      case "completed":
        return "text-green-600 border-green-600";
      case "pending":
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  // For circle and square types, we'll create a ring with transparent center
  // so the line appears to go through them
  switch (type) {
    case "circle":
      return (
        <div
          className={`relative w-5 h-5 rounded-full border-2 bg-white ${getStatusClasses()}`}
        >
          {/* Inner white circle to create the "hole" effect */}
          <div
            className="absolute inset-0 rounded-full bg-white"
            style={{ margin: "2px" }}
          />
        </div>
      );
    case "circle-filled":
      return (
        <div className="relative">
          {/* Background circle that covers the line */}
          <div
            className={`absolute w-5 h-5 rounded-full bg-white z-6`}
            style={{ top: 0, left: 0 }}
          />
          {/* Filled circle on top */}
          <Circle
            className={`relative w-5 h-5 fill-current z-7 ${getStatusClasses()}`}
          />
        </div>
      );
    case "square":
      return (
        <div className={`relative w-5 h-5 border-2 ${getStatusClasses()}`}>
          {/* Inner white square to create the "hole" effect */}
          <div
            className="absolute inset-0 bg-white"
            style={{ margin: "2px" }}
          />
        </div>
      );
    case "triangle":
      return (
        <div className="relative">
          {/* Background to cover the line */}
          <div
            className="absolute w-6 h-6 bg-background z-6"
            style={{ top: -1, left: -1 }}
          />
          {/* Triangle on top */}
          <Triangle
            className={`relative fill-white w-6 h-6 z-7 ${getStatusClasses()}`}
          />
        </div>
      );
    case "end":
      return (
        <div
          className={`relative z-10 px-2 py-1 text-xs text-white rounded ${
            status === "active" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          {status === "active" ? "ACTIVE" : "END"}
        </div>
      );
    default:
      return null;
  }
}
