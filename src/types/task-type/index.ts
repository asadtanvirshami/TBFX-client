export default interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string | null;
  flag: boolean;
}

export interface TradeStatsResponse {
  totalTrades: number;
  totalTradesPastWeek: number;
  totalTradesCurrentMonth: number;
  winRate: number;
  profitFactor: number;
  riskRewardRatio: number;
  mostTradedPair: string;
  totalProfit: number;
  totalLoss: number;
  totalNetProfit: number;
  profitLossRatio: number;
  avgProfitPerTrade: number;
}
