import { TradeRaw } from "@/types/trade-type/type";

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

type RawTrade = {
  symbol: string;
  profit: number;
};

export function transformTradesToPieChartData(
  rawTrades: TradeRaw[]
): PieChartTradeData[] {
  const COLORS = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
    "#facc15",
    "#38bdf8",
    "#c084fc",
    "#4ade80",
  ];

  const pairMap = new Map<string, number>();
  const result: PieChartTradeData[] = [];

  for (const trade of rawTrades) {
    const currentProfit = pairMap.get(trade.symbol) ?? 0;
    pairMap.set(trade.symbol, currentProfit + trade.profit);
  }

  Array.from(pairMap.entries()).forEach(([pair, profit], index) => {
    result.push({
      pair,
      profit: parseFloat(profit.toFixed(2)),
      fill: COLORS[index % COLORS.length],
    });
  });

  return result;
}
