import React, { memo } from "react";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col p-6 space-y-5 h-full">
      <div className=" w-full">
        <div className="w-full h-[180px] mx-2 my-2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full ">
        <div className="w-full h-[350px] mx-2 my-2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="w-full h-[350px] mx-2 my-2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
      <div className="w-full">
        <div className="w-full h-[280px] mx-2 my-2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
        <div className="w-full h-[180px] mx-2 my-2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="w-full h-[180px] mx-2 my-2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    </div>
  );
};

export default memo(DashboardSkeleton);
