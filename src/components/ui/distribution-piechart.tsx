"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PieChartTradeData = {
  pair: string;
  profit: number;
  fill: string;
};

interface DistributionPieChartProps {
  chartData: PieChartTradeData[];
}

export function DistributiionPieChart({
  chartData,
}: DistributionPieChartProps) {
  const chartConfig: ChartConfig = chartData.reduce((config, item, index) => {
    config[item.pair] = {
      label: item.pair,
      color: item.fill,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader className="items-center gap-4 !flex border-b">
        <div className="flex flex-col">
          <CardTitle>Profit Distribution</CardTitle>
          <CardDescription>
            Distribution of profits on trade pair.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="profit" nameKey="pair" stroke="0" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
