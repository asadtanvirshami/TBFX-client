// utils/drawCalculator.ts
export type AssetClass = "forex" | "indices" | "crypto" | "commodities";

export interface CalcInput {
  assetClass: AssetClass;
  balance: number;
  riskPercent: number;
  entry: number;
  stopLoss: number;
  takeProfit?: number;
  contractSize?: number;
  tickValue?: number;
  leverage?: number;
}

export function calculateDraw({
  assetClass,
  balance,
  riskPercent,
  entry,
  stopLoss,
  takeProfit,
  contractSize,
  tickValue,
  leverage,
}: CalcInput) {
  const riskAmount = (balance * riskPercent) / 100;
  let positionSize = 0;
  let risk = 0;
  let reward = 0;

  switch (assetClass) {
    case "forex":
      const pipValue = contractSize ?? 100000; // default 1 lot = 100k units
      const stopPips = Math.abs(entry - stopLoss) * 10000; // pip calculation
      positionSize = riskAmount / (stopPips * 0.0001 * pipValue);
      risk = riskAmount;
      if (takeProfit) {
        const rewardPips = Math.abs(takeProfit - entry) * 10000;
        reward = rewardPips * 0.0001 * pipValue * positionSize;
      }
      break;

    case "indices":
      const tickVal = tickValue ?? 50; // e.g., S&P500 $50/point
      const stopPoints = Math.abs(entry - stopLoss);
      positionSize = riskAmount / (stopPoints * tickVal);
      risk = riskAmount;
      if (takeProfit) {
        reward = Math.abs(takeProfit - entry) * tickVal * positionSize;
      }
      break;

    case "crypto":
      const stopMove = Math.abs(entry - stopLoss);
      positionSize = riskAmount / stopMove; // in units (e.g., BTC)
      risk = riskAmount;
      if (takeProfit) {
        reward = Math.abs(takeProfit - entry) * positionSize;
      }
      break;

    case "commodities":
      const contractVal = contractSize ?? 100; // e.g., Gold = 100 oz
      const stopMoveCom = Math.abs(entry - stopLoss);
      positionSize = riskAmount / (stopMoveCom * contractVal);
      risk = riskAmount;
      if (takeProfit) {
        reward = Math.abs(takeProfit - entry) * contractVal * positionSize;
      }
      break;
  }

  const rr = reward > 0 ? (reward / risk).toFixed(2) : "N/A";

  return {
    positionSize: positionSize.toFixed(2),
    risk: risk.toFixed(2),
    reward: reward.toFixed(2),
    rr,
  };
}
