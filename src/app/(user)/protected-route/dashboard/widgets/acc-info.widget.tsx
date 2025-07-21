import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface AccInfoData {
  label: string;
  value: string;
  description?: string;
}

const accountData: AccInfoData[] = [
  {
    label: "Most Traded Pair",
    value: "EURUSD",
    description: "Highest number of trades",
  },
  {
    label: "Total Trades",
    value: "142",
    description: "In current month",
  },
  {
    label: "Total Profit",
    value: "$3,250",
    description: "Net profit this month",
  },
  {
    label: "Avg Profit / Trade",
    value: "$22.89",
    description: "Average per winning trade",
  },
];

const AccInfoWidget = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {accountData.map((item, index) => (
        // <Card key={index} className="shadow-sm border border-muted/40">
        <Card key={index} className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">
              {item.label}
            </CardTitle>
            {item.description && (
              <CardDescription className="text-xs">
                {item.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccInfoWidget;
