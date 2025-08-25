export interface StrategyData {
  id: string;
  title: string;
  description: string;
  rules: (string | undefined)[];
  type: "manual" | "elite" | "paid" | "addon";
  cost?: string;
}
