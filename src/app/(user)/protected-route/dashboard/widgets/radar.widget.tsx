"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RadarData {
  pair: string;
  value: number;
}

export function TradeRadar({
  data,
  type,
}: {
  data: RadarData[];
  type: "Most Traded" | "Most Profitable";
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{type} Pairs</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="pair" />
            <PolarRadiusAxis angle={30} domain={[0, "dataMax"]} />
            <Radar
              name={type}
              dataKey="value"
              stroke={type === "Most Traded" ? "#3b82f6" : "#22c55e"}
              fill={type === "Most Traded" ? "#3b82f6" : "#22c55e"}
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
