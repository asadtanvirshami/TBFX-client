type Trade = {
  pair: string;
  profit: number;
  // add any other relevant fields if needed
};

type PieChartTradeData = {
  pair: string;
  profit: number;
  fill: string;
};

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
];

export function transformTradesToPieChartData(
  trades: Trade[]
): PieChartTradeData[] {
  const profitByPair: Record<string, number> = {};

  for (const trade of trades) {
    if (!profitByPair[trade.pair]) {
      profitByPair[trade.pair] = 0;
    }
    profitByPair[trade.pair] += trade.profit;
  }

  return Object.entries(profitByPair).map(([pair, profit], index) => ({
    pair,
    profit,
    fill: chartColors[index % chartColors.length],
  }));
}
