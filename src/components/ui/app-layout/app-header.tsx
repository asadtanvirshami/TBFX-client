import React from "react";
import { SidebarTrigger } from "../sidebar";

const AppHeader = () => {
  return (
    <div className="w-full h-9">
      <div className="w-full h-full">
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default AppHeader;
