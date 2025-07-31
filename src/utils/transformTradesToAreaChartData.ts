import { TradeRaw } from "@/types/trade-type/type";

export function transformTradesToChartData(trades: TradeRaw[]) {
  const dailyMap = new Map<string, { profit: number; loss: number }>();

  trades.forEach((trade) => {
    const date = new Date(trade.createdAt).toISOString().split("T")[0];

    if (!dailyMap.has(date)) {
      dailyMap.set(date, { profit: 0, loss: 0 });
    }

    const day = dailyMap.get(date)!;

    if (trade.profit > 0) {
      day.profit += trade.profit;
    } else if (trade.profit < 0) {
      day.loss += Math.abs(trade.profit);
    }

    dailyMap.set(date, day);
  });

  const sorted = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, values]) => ({ date, ...values }));

  return sorted;
}
