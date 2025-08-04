"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TradeStatsResponse } from "@/types/task-type";
import React, { memo } from "react";

interface TradeInfoCardProps {
  label: string;
  value: string | number;
  description?: string;
}

const TradeInfoCard = memo(
  ({ label, description, value }: TradeInfoCardProps) => {
    return (
      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="text-base text-muted-foreground">
            {label}
          </CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{value}</div>
        </CardContent>
      </Card>
    );
  }
);
TradeInfoCard.displayName = "TradeInfoCard";

interface TradeStatsResponseProps {
  data: TradeStatsResponse;
}

const AccInfoWidget = memo(function AccInfoWidget({
  data: {
    mostTradedPair,
    totalTradesCurrentMonth,
    totalNetProfit,
    avgProfitPerTrade,
  },
}: TradeStatsResponseProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <TradeInfoCard
        label="Most Traded Pair"
        value={mostTradedPair || "No Pair"}
        description="Highest number of trades"
      />
      <TradeInfoCard
        label="Most Trades"
        value={totalTradesCurrentMonth || "0"}
        description="In current month"
      />
      <TradeInfoCard
        label="Avg Profit / Trade"
        value={avgProfitPerTrade || "0"}
        description="Average per winning trade"
      />
      <TradeInfoCard
        label="Total Net Profit"
        value={totalNetProfit || "0"}
        description="Net profit this month"
      />
    </div>
  );
});

export default AccInfoWidget;
