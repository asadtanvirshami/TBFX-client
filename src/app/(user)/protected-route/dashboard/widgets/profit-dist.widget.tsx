import { DistributiionPieChart } from "@/components/ui/distribution-piechart";
import { Trade } from "@/types/trade-type/type";
import React, { memo } from "react";
import { transformTradesToPieChartData } from "@/utils/transformTradesToPieChartData";
interface ProfitDistributionWidgetProps {
  data: Trade[];
}
const ProfitDistributionWidget: React.FC<ProfitDistributionWidgetProps> = ({
  data,
}) => {
  const chartData = transformTradesToPieChartData(data);

  return <DistributiionPieChart chartData={chartData} />  ;
};

export default memo(ProfitDistributionWidget);
