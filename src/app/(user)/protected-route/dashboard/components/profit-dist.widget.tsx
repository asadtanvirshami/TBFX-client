import { DistributionPieChart } from "@/components/ui/distribution-piechart";
import { TradeRaw } from "@/types/trade-type/type";
import React, { memo } from "react";
import { transformTradesToPieChartData } from "@/utils/transform_piechart_data";

interface ProfitDistributionWidgetProps {
  data: TradeRaw[];
}
const ProfitDistributionWidget: React.FC<ProfitDistributionWidgetProps> = ({
  data,
}) => {
  const chartData = transformTradesToPieChartData(data);

  return <DistributionPieChart chartData={chartData} />;
};

export default memo(ProfitDistributionWidget);
