import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import {
  ArrowDownUp,
  Calculator,
  Calendar,
  ChartArea,
  ChartBar,
  Cloud,
  Link,
} from "lucide-react";
const OfferCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title} {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
};

const OfferSection = () => {
  const tradingBacktestingFeatures = [
    {
      title: "Strategy Backtesting",
      description:
        "Simulate and validate your trading strategies using historical market data across various timeframes and asset classes.",
      icon: <ChartArea />,
    },
    {
      title: "Real-Time Market News",
      description:
        "Stay ahead with up-to-the-minute financial news and updates from global markets.",
      icon: <ArrowDownUp />,
    },
    {
      title: "Economic Calendars & Events",
      description:
        "Track upcoming economic releases, central bank decisions, and market-moving events for better planning.",
      icon: <Calendar />,
    },
    {
      title: "MetaTrader Integration",
      description:
        "Seamlessly sync with MT4/MT5 to mirror trades, import data, and manage positions from one platform.",
      icon: <Link />,
    },
    {
      title: "Lot Size & Risk Calculators",
      description:
        "Calculate lot sizes, pip values, and risk percentages based on your account balance and strategy.",
      icon: <Calculator />,
    },
    {
      title: "Performance Analytics",
      description:
        "Analyze your trade history, spot patterns, and generate detailed performance reports.",
      icon: <ChartBar />,
    },
  ];
  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-12">
      <span className="text-4xl space-x-3 flex justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
        <h1 className="t bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          What We
        </h1>
        <h1>Offer</h1>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-3">
        {tradingBacktestingFeatures.map((feature) => (
          <OfferCard
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
