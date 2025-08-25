"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { openForm } from "@/redux/slices/ui/slice";
import { StrategyData } from "@/types/strategy-type/type";

interface TabMenuProps {
  data: StrategyData[];
  setData: (data: StrategyData[]) => void;
}

const TabMenu = ({ data, setData }: TabMenuProps) => {
  console.log(data);
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger onClick={() => setData(data)} value="all">
          All
        </TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
        <TabsTrigger value="elite">Elite</TabsTrigger>
        <TabsTrigger value="elite">Addon</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const AddButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant={"success"}
      onClick={() => dispatch(openForm("strategy-form"))}
    >
      Add Strategy
      <PlusCircle />
    </Button>
  );
};

const StrategyHeader = ({ data, setData }: TabMenuProps) => {
  return (
    <div className="flex justify-between gap-2">
      <TabMenu data={data} setData={setData} />
      <AddButton />
    </div>
  );
};

export default StrategyHeader;
