import React from "react";
import { SidebarTrigger } from "../sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AppHeader = () => {
  return (
    <div className="w-full border-b bg-card sticky top-0">
      <div className="w-full">
        <div className="flex items-center gap-2 justify-between">
          <div>
            <SidebarTrigger />
          </div>
          <Select>
            <SelectTrigger className="w-[180px] mx-2 my-2">
              <SelectValue placeholder="Select a Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Accounts</SelectLabel>
                <SelectItem value="apple">233123</SelectItem>
                <SelectItem value="banana">22344</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
