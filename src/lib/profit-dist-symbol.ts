import { trades } from "@/components/ui/landing-layout/tabs-section/calendar/mock/data";

export const ProfitDistSymbol = () => {
  console.log(trades);

  const profitData = trades.map((trade) => ({
    symbol: trade.pair,
    profit: trade.profit,
  }));

  return {
    profitData,
  };
};
