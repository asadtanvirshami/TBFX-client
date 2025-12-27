import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title:
    | "Total Trades"
    | "Total Profit"
    | "Total Loss"
    | "Win Rate"
    | "Profit Factor"
    | "Risk/Reward Ratio";
  description: string;
  Icon: React.ElementType;
  values?: string | number | null;
}

const MetricCard = ({ title, description, values, Icon }: MetricCardProps) => {
  return (
    <Card className=" h-full p-4 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl">{values}</CardTitle>
        <Badge
          className={cn(
            "text-white bg-gradient-to-r ",
            title === "Win Rate" && "from-blue-500 to-sky-500",
            title === "Risk/Reward Ratio" && "from-orange-500 to-yellow-500",
            title === "Profit Factor" && "from-teal-500 to-teal-500",
            title === "Total Loss" && "from-red-500 to-red-600",
            title === "Total Trades" && "from-violet-500 to-violet-600",
            title === "Total Profit" && "from-green-500 to-green-600"
          )}
        >
          <Icon />
          {title}
        </Badge>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MetricCard;
