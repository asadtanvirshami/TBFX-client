export interface TradeStats {
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

export interface Trade {
  id: string;
  ticket: number;
  symbol: string;
  type: string;
  lots: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  openDate?: string;
  closeDate?: string;
  accountId?: string;
  status?: string;
  strategyTag?: string;
  slippage?: number;
}