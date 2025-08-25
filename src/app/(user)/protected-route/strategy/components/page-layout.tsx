"use client";

import { Fragment, useState } from "react";
import StrategyCard from "./strategy-card";
// import { Card } from "@/components/ui/card";
// import Cards from "./strategy-card";
import AddStrategyCard from "./add-strategy";
// import StrategyForm from "../form/strategy-form";
// import TabMenu from "./tab-menu";
import { StrategyData } from "@/types/strategy-type/type";
import StrategyHeader from "./tab-menu";

const PageLayout = () => {
  const [data, setData] = useState<StrategyData[]>([
    {
      id: "strat_1",
      title: "Breakout Strategy",
      description:
        "Enter when price breaks above resistance or below support with high volume.",
      rules: [
        "Identify key support and resistance zones",
        "Buy on breakout above resistance with >20% volume spike",
        "Place stop-loss below breakout level",
        "Target: 2x risk-to-reward",
      ],
      type: "manual",
    },
    {
      id: "strat_2",
      title: "RSI Pullback",
      description: "Use RSI to spot overbought/oversold pullbacks in trend.",
      rules: [
        "Check main trend direction with 200 EMA",
        "In uptrend: buy when RSI < 35",
        "In downtrend: sell when RSI > 65",
        "Take profit at previous swing high/low",
      ],
      type: "manual",
    },

    {
      id: "elite_1",
      title: "Golden EMA Crossover",
      description:
        "Institutional-grade trend-following strategy using 50 EMA and 200 EMA.",
      rules: [
        "Buy when 50 EMA crosses above 200 EMA",
        "Sell when 50 EMA crosses below 200 EMA",
        "Trailing stop-loss: 2% ATR",
        "Works best on 1H and 4H charts",
      ],
      cost: "Included in Elite Plan",
      type: "elite",
    },
    {
      id: "elite_2",
      title: "Smart Money Divergence",
      description:
        "Advanced divergence strategy combining RSI and order blocks.",
      rules: [
        "Spot bullish divergence at order block support",
        "Confirm entry with volume surge",
        "Stop-loss just below order block",
        "Target: 3x risk-to-reward",
      ],
      cost: "$29 (One-Time Purchase)",
      type: "elite",
    },
    {
      id: "addon_1",
      title: "Scalping M1-M5",
      description: "High-frequency strategy designed for scalping EURUSD.",
      rules: [
        "Use Bollinger Bands on 1-minute chart",
        "Enter at band extremes with RSI confirmation",
        "Take profit: 5–10 pips",
        "Stop-loss: 3–5 pips",
      ],
      cost: "$19",
      type: "addon",
    },
    {
      id: "addon_2",
      title: "Crypto Swing Setup",
      description: "Swing trading setup for BTC/ETH with volatility filter.",
      rules: [
        "Buy on daily higher-low retracement",
        "Use ATR(14) to filter volatile ranges",
        "Stop-loss: 1.5x ATR",
        "Target: 3x ATR",
      ],
      cost: "$39",
      type: "addon",
    },
  ]);

  return (
    <Fragment>
      <div className="p-12 space-y-8">
        <StrategyHeader data={data} setData={setData} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
          {data.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
          <AddStrategyCard />
        </div>
      </div>
      {/* <StrategyForm buttonVisibility={false} /> */}
    </Fragment>
  );
};

export default PageLayout;
