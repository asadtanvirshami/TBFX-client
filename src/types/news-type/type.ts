export type ImpactLevel = "High" | "Medium" | "Low";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  impact: ImpactLevel;
  date: string;
  source: string;
  url: string;
}
