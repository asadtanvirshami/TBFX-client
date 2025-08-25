"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { openForm } from "@/redux/slices/ui/slice";

import { AreaChart, PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AddStrategyCard() {
  const dispatch = useDispatch();
  return (
    <Card className="border rounded-xl shadow-sm h-[20rem]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Add New Strategy
          <AreaChart />
        </CardTitle>
        {
          <CardDescription>
            You can add a custom strategy manually.
          </CardDescription>
        }
      </CardHeader>

      <CardContent className="flex justify-center items-center h-full border">
        <Button
          onClick={() => dispatch(openForm("strategy-form"))}
          className="text-white bg-gradient-to-tr from-green-500 to-green-600 text-md"
          size={"lg"}
        >
          Add Strategy
          <PlusCircle />
        </Button>
      </CardContent>
    </Card>
  );
}
