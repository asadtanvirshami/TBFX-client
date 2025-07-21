export interface Trade {
  id: string;
  date: string; // ISO format e.g. "2025-07-01T09:30:00Z"
  pair: string; // Currency pair or instrument
  profit: number; // Profit or loss amount
  entry: string; // Entry price or signal
  exit: string; // Exit price or reason
  notes: string; // Optional notes
}
