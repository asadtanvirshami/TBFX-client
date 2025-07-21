import dayjs from "dayjs";

type Trade = {
  symbol: string;
  profit: number;
  timestamp: string;
};
export function generateRadarData(trades: Trade[]) {
  const currentMonth = dayjs().month();
  const thisMonthTrades = trades.filter(
    (t) => dayjs(t.timestamp).month() === currentMonth
  );

  const stats: Record<string, { count: number; profit: number }> = {};

  thisMonthTrades.forEach((trade) => {
    if (!stats[trade.symbol]) {
      stats[trade.symbol] = { count: 0, profit: 0 };
    }
    stats[trade.symbol].count += 1;
    stats[trade.symbol].profit += trade.profit;
  });

  const sortedByCount = Object.entries(stats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([pair, val]) => ({ pair, value: val.count }));

  const sortedByProfit = Object.entries(stats)
    .sort((a, b) => b[1].profit - a[1].profit)
    .slice(0, 5)
    .map(([pair, val]) => ({ pair, value: val.profit }));

  return { sortedByCount, sortedByProfit };
}
