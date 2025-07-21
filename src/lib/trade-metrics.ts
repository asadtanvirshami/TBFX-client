import { Trade } from "@/types/trade-type/type";

export function analyzeTrades(trades: Trade[]) {
  const totalPL = trades.reduce((sum, t) => sum + t.profit, 0);
  const totalTrades = trades.length;
  const winTrades = trades.filter((t) => t.profit > 0).length;
  const winRate = (winTrades / totalTrades) * 100;

  const grossProfit = trades
    .filter((t) => t.profit > 0)
    .reduce((sum, t) => sum + t.profit, 0);
  const grossLoss = Math.abs(
    trades.filter((t) => t.profit < 0).reduce((sum, t) => sum + t.profit, 0)
  );
  const profitFactor = grossLoss === 0 ? Infinity : grossProfit / grossLoss;

  const winAmounts = trades.filter((t) => t.profit > 0).map((t) => t.profit);
  const lossAmounts = trades
    .filter((t) => t.profit < 0)
    .map((t) => Math.abs(t.profit));
  const avgWin = winAmounts.length
    ? winAmounts.reduce((a, b) => a + b, 0) / winAmounts.length
    : 0;
  const avgLoss = lossAmounts.length
    ? lossAmounts.reduce((a, b) => a + b, 0) / lossAmounts.length
    : 0;
  const rrRatio = avgLoss === 0 ? Infinity : avgWin / avgLoss;

  return {
    totalPL,
    winRate,
    profitFactor,
    rrRatio,
    totalTrades,
    winTrades,
  };
}
