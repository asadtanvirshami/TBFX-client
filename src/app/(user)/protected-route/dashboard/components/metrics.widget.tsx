import MetricCard from "@/components/ui/metric-card";
import { TradeStatsResponse } from "@/types/task-type";
import {
  ArrowBigUpIcon,
  Award,
  ChartCandlestickIcon,
  Circle,
  FileBadge2Icon,
} from "lucide-react";
import React, { memo } from "react";

interface MetricsWidgetProps {
  data: TradeStatsResponse;
}

const MetricsWidget: React.FC<MetricsWidgetProps> = ({ data }) => {
  return (
    <div className="w-full h-full space-y-4">
      <h1 className="text-2xl font-bold mt-2 mb-4">{"Metric's Summary"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <MetricCard
          Icon={() => <ChartCandlestickIcon className="w-5 h-5" />}
          title="Total Trades"
          description="Total number of trades executed"
          values={data.totalTrades}
        />
        <MetricCard
          Icon={() => (
            <>
              <Circle className="w-5 h-5" fill="green" />
            </>
          )}
          title="Total Profit"
          description="Total profit from all trades"
          values={data?.totalProfit || "0"}
        />
        <MetricCard
          Icon={() => (
            <>
              <Circle className="w-5 h-5" fill="red" />
            </>
          )}
          title="Total Loss"
          description="Total loss from all trades"
          values={data?.totalLoss || "0"}
        />
        <MetricCard
          Icon={() => <FileBadge2Icon className="w-5 h-5" />}
          title="Win Rate"
          description="Percentage of winning trades"
          values={data?.winRate + "%" || "0"}
        />
        <MetricCard
          Icon={() => <ArrowBigUpIcon className="w-5 h-5" />}
          title="Profit Factor"
          description="Total profit factor from all trades"
          values={data?.profitFactor || "0"}
        />
        <MetricCard
          Icon={() => <Award className="w-5 h-5" />}
          title="Risk/Reward Ratio"
          description="Average risk/reward ratio of trades"
          values={data?.riskRewardRatio || "0"}
        />
      </div>
    </div>
  );
};

export default memo(MetricsWidget);
