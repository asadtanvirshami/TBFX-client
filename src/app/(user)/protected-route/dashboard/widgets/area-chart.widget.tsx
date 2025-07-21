"use client";

import * as React from "react";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Static Config
const chartConfig: ChartConfig = {
  profit: { label: "Profit", color: "hsl(var(--chart-1))" },
  loss: { label: "Loss", color: "hsl(var(--chart-2))" },
};

// Static Chart Data (already done, great)
const chartData = [
  { date: "2024-04-01", profit: 222, loss: 150 },
  { date: "2024-04-02", profit: 97, loss: 180 },
  { date: "2024-04-03", profit: 167, loss: 120 },
  { date: "2024-04-04", profit: 242, loss: 260 },
  { date: "2024-04-05", profit: 373, loss: 290 },
  { date: "2024-04-06", profit: 301, loss: 340 },
  { date: "2024-04-07", profit: 245, loss: 180 },
  { date: "2024-04-08", profit: 409, loss: 320 },
  { date: "2024-04-09", profit: 59, loss: 110 },
  { date: "2024-04-10", profit: 261, loss: 190 },
  { date: "2024-04-11", profit: 327, loss: 350 },
  { date: "2024-04-12", profit: 292, loss: 210 },
  { date: "2024-04-13", profit: 342, loss: 380 },
  { date: "2024-04-14", profit: 137, loss: 220 },
  { date: "2024-04-15", profit: 120, loss: 170 },
  { date: "2024-04-16", profit: 138, loss: 190 },
  { date: "2024-04-17", profit: 446, loss: 360 },
  { date: "2024-04-18", profit: 364, loss: 410 },
  { date: "2024-04-19", profit: 243, loss: 180 },
  { date: "2024-04-20", profit: 89, loss: 150 },
  { date: "2024-04-21", profit: 137, loss: 200 },
  { date: "2024-04-22", profit: 224, loss: 170 },
  { date: "2024-04-23", profit: 138, loss: 230 },
  { date: "2024-04-24", profit: 387, loss: 290 },
  { date: "2024-04-25", profit: 215, loss: 250 },
  { date: "2024-04-26", profit: 75, loss: 130 },
  { date: "2024-04-27", profit: 383, loss: 420 },
  { date: "2024-04-28", profit: 122, loss: 180 },
  { date: "2024-04-29", profit: 315, loss: 240 },
  { date: "2024-04-30", profit: 454, loss: 380 },
  { date: "2024-05-01", profit: 165, loss: 220 },
  { date: "2024-05-02", profit: 293, loss: 310 },
  { date: "2024-05-03", profit: 247, loss: 190 },
  { date: "2024-05-04", profit: 385, loss: 420 },
  { date: "2024-05-05", profit: 481, loss: 390 },
  { date: "2024-05-06", profit: 498, loss: 520 },
  { date: "2024-05-07", profit: 388, loss: 300 },
  { date: "2024-05-08", profit: 149, loss: 210 },
  { date: "2024-05-09", profit: 227, loss: 180 },
  { date: "2024-05-10", profit: 293, loss: 330 },
  { date: "2024-05-11", profit: 335, loss: 270 },
  { date: "2024-05-12", profit: 197, loss: 240 },
  { date: "2024-05-13", profit: 197, loss: 160 },
  { date: "2024-05-14", profit: 448, loss: 490 },
  { date: "2024-05-15", profit: 473, loss: 380 },
  { date: "2024-05-16", profit: 338, loss: 400 },
  { date: "2024-05-17", profit: 499, loss: 420 },
  { date: "2024-05-18", profit: 315, loss: 350 },
  { date: "2024-05-19", profit: 235, loss: 180 },
  { date: "2024-05-20", profit: 177, loss: 230 },
];

const AreaChartWidget = React.memo(() => {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30");
    const days = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - days);
    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [timeRange]);

  const formatDate = React.useCallback(
    (value: string) =>
      new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    []
  );

  return (
    <div className="w-full">
      <Card className="pt-0 w-full">
        <CardHeader className="flex items-center gap-2 py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>P/L Area-Chart</CardTitle>
            <CardDescription>
              Showing total profit and loss over time
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] hidden sm:flex">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#74c69d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#74c69d" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="loss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff758f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff758f" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeOpacity={0.05} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={formatDate}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={formatDate}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="profit"
                type="monotone"
                fill="url(#profit)"
                stroke="#74c69d"
                strokeWidth={2}
                isAnimationActive={false}
                stackId="a"
              />
              <Area
                dataKey="loss"
                type="monotone"
                fill="url(#loss)"
                stroke="#ff758f"
                strokeWidth={2}
                isAnimationActive={false}
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
});

AreaChartWidget.displayName = "AreaChartWidget";
export { AreaChartWidget };
