import MetricCard from "@/components/ui/metric-card";
import { analyzeTrades } from "@/lib/trade-metrics";
import { Trade } from "@/types/trade-type/type";
import {
  ArrowBigUpIcon,
  Award,
  ChartCandlestickIcon,
  Circle,
  FileBadge2Icon,
  Trophy,
} from "lucide-react";
import React, { memo } from "react";

interface MetricsWidgetProps {
  data: Trade[];
}

const MetricsWidget: React.FC<MetricsWidgetProps> = ({ data }) => {
  const metrics = analyzeTrades(data);
  return (
    <div className="w-full h-full space-y-4">
      <h1 className="text-2xl font-bold mt-2 mb-4">Metric's Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <MetricCard
          Icon={() => <ChartCandlestickIcon className="w-5 h-5" />}
          title="Total Trades"
          description="Total number of trades executed"
          values={metrics.totalTrades}
        />
        <MetricCard
          Icon={() => (
            <>
              <Circle className="w-5 h-5" fill="green" />
              <Circle className="w-5 h-5" fill="red" />
            </>
          )}
          title="Total P&L"
          description="Total profit and loss from all trades"
          values={metrics.totalPL.toFixed(2)}
        />
        <MetricCard
          Icon={() => <FileBadge2Icon className="w-5 h-5" />}
          title="Win Rate"
          description="Percentage of winning trades"
          values={metrics.winRate.toFixed(1) + "%"}
        />
        <MetricCard
          Icon={() => <ArrowBigUpIcon className="w-5 h-5" />}
          title="Profit Factor"
          description="Total profit factor from all trades"
          values={metrics.profitFactor.toFixed(2)}
        />
        <MetricCard
          Icon={() => <Award className="w-5 h-5" />}
          title="Risk/Reward Ratio"
          description="Average risk/reward ratio of trades"
          values={metrics.rrRatio.toFixed(2)}
        />
        <MetricCard
          Icon={() => <Trophy className="w-5 h-5" />}
          title="Win Rate"
          description="Percentage of winning trades"
          values={metrics.winTrades}
        />
      </div>
    </div>
  );
};

export default memo(MetricsWidget);
