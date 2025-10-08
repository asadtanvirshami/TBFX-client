"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { StrategyData, StrategyQueries } from "@/types/strategy-type/type";
import { openDialog } from "@/redux/slices/dialog/dialog-slice";

interface TabMenuProps {
  data: StrategyData[];
  setData: (data: StrategyData[]) => void;
  setQueries: React.Dispatch<React.SetStateAction<StrategyQueries>>;
}

const TabMenu = ({ data, setData, setQueries }: TabMenuProps) => {
  const handleFilter = (type: string) => {
    setQueries({ page: 1, limit: 10, filters: { type: type } });
    setData(data);
  };

  return (
    <Tabs defaultValue={"all"} className="w-full">
      <TabsList>
        <TabsTrigger onClick={() => handleFilter("")} value="all">
          All
        </TabsTrigger>
        <TabsTrigger onClick={() => handleFilter("PERSONAL")} value="personal">
          Personal
        </TabsTrigger>
        <TabsTrigger onClick={() => handleFilter("ELITE")} value="elite">
          Elite
        </TabsTrigger>
        <TabsTrigger onClick={() => handleFilter("ADDON")} value="addon">
          Addon
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
const AddButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      className="w-fit"
      variant={"success"}
      onClick={() =>
        dispatch(
          openDialog({
            formType: "strategy",
            mode: "add",
            data: null,
            size: "lg",
          })
        )
      }
    >
      Add Strategy
      <PlusCircle />
    </Button>
  );
};

const StrategyHeader = ({ data, setData, setQueries }: TabMenuProps) => {
  return (
    <div className="grid md:flex lg:flex grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-between gap-2">
      <TabMenu data={data} setData={setData} setQueries={setQueries} />
      <AddButton />
    </div>
  );
};

export default StrategyHeader;
