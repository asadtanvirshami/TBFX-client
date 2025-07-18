//app/protected-route/dashboard/page.tsx

"use client";
import { EventCalendar } from "@/components/ui/event-calendar";
import React, { memo } from "react";



const Dashboard = () => {
  return (
    <div
      className="w-screen h-screen container mt-12 justify-center space-y-8 items-center m-auto"
    >
      <div className="flex flex-col p-3 items-center justify-center bg-red-400">
        <EventCalendar taskData={Trade}/>
      </div>
    </div >
  );
};

export default memo(Dashboard);
