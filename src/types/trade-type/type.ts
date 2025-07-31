export interface Trade {
  id: string;
  date: string; // ISO format e.g. "2025-07-01T09:30:00Z"
  pair: string; // Currency pair or instrument
  profit: number; // Profit or loss amount
  entry: string; // Entry price or signal
  exit: string; // Exit price or reason
  notes: string; // Optional notes
}

export interface TradeRaw {
  id: string;
  ticket: number;
  accountNumber: string;
  symbol: string;
  type: string; // You can replace this with an enum if needed
  lots: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  openDate: Date | null;
  closeDate: Date | null;
  status: string | null;
  strategyTag: string | null;
  slippage: number | null;
  createdAt: Date;
  updatedAt: Date;
}
