"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge"; // shadcn badge for labels
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

interface Strategy {
  id: string;
  title: string;
  description: string;
  rules: (string | undefined)[];
  type: "manual" | "elite" | "paid" | "addon";
  cost?: string;
}

const getBadgeColor = (data: Strategy) => {
  switch (data.type) {
    case "manual":
      return "bg-gradient-to-r from-blue-500 to-sky-500 text-white w-fit";
    case "elite":
      return "bg-gradient-to-r from-pink-500 to-rose-500 text-white w-fit";
    case "addon":
      return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white w-fit";
    default:
      return "bg-gray-500 text-white w-fit";
  }
};

export default function StrategyCard({ strategy }: { strategy: Strategy }) {
  const { title, description, rules, type, cost } = strategy;

  return (
    <Card className="border rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}

          <Badge
            className={cn(
              getBadgeColor(strategy),
              "w-18 px-8 py-1 shadow-md text-sm"
            )}
          >
            {type.toUpperCase()}
          </Badge>
        </CardTitle>
        {<CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-full">
        {type === "manual" && (
          <ul className="px-4 list-disc list-inside text-sm text-gray-500 space-y-1">
            {rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        )}
        {type === "elite" && (
          <ul className="px-4 list-disc blur list-inside text-sm text-gray-500 space-y-1">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Expedita, qui consectetur quod porro cupiditate autem doloribus
              saepe illo inventore facere sequi doloremque ea laborum labore
              nemo delectus eligendi iste eaque.
            </p>
          </ul>
        )}
        {type === "addon" && (
          <ul className="px-4 list-disc blur list-inside text-sm text-gray-500 space-y-1">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Expedita, qui consectetur quod porro cupiditate autem doloribus
              saepe illo inventore facere sequi doloremque ea laborum labore
              nemo delectus eligendi iste eaque.
            </p>
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm mt-5">
        {cost && (
          <Fragment>
            <Button
              className={cn(
                getBadgeColor(strategy),
                "w-22 px-8 py-2 shadow-md text-sm w-fit text-sm  "
              )}
            >
              Buy
            </Button>
            <p className="font-semibold text-lg">{cost}</p>
          </Fragment>
        )}
        {!cost && (
          <Fragment>
            <Button
              className={cn(
                getBadgeColor(strategy),
                "w-22 px-8 py-2 shadow-md text-sm w-fit text-sm  "
              )}
            >
              Access <ArrowRightIcon />
            </Button>
            <p className="font-semibold text-xl">{cost}</p>
          </Fragment>
        )}
      </CardFooter>
    </Card>
  );
}
