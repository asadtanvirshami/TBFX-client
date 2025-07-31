"use client";

import { memo, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterXIcon } from "lucide-react";
import { TradeRaw } from "@/types/trade-type/type";

interface TradeHistoryProps {
  data: TradeRaw[];
}

const TradeHistoryWidget = memo(function TradeHistoryWidget({
  data,
}: TradeHistoryProps) {
  const [selectedDate, setSelectedDate] = useState("");

  const simplifiedTrades = useMemo(() => {
    return data.map((trade) => {
      const type = trade.type === "0" ? "Buy" : "Sell";
      const result =
        trade.profit > 0 ? "Profit" : trade.profit < 0 ? "Loss" : "Breakeven";

      const rawDate = trade.closeDate || trade.createdAt;
      const parsedDate = new Date(rawDate);
      const date = isNaN(parsedDate.getTime())
        ? "Invalid Date"
        : parsedDate.toISOString().split("T")[0];

      return {
        id: trade.id,
        pair: trade.symbol,
        type,
        profit: trade.profit,
        result,
        date,
      };
    });
  }, [data]);

  const filteredTrades = useMemo(() => {
    if (!selectedDate) return simplifiedTrades;
    return simplifiedTrades.filter((txn) => txn.date === selectedDate);
  }, [selectedDate, simplifiedTrades]);

  return (
    <div className="w-full">
      <Card className="overflow-x-auto rounded-xl border">
        <CardHeader className="border-b space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <CardTitle>Trade Summary</CardTitle>
              <CardDescription>
                Quick overview of profits and losses.
              </CardDescription>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="date"
                className="w-fit"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setSelectedDate("")}
                >
                  <FilterXIcon />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-[270px] overflow-y-auto p-3">
          {filteredTrades.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              {data?.length === 0 ? "No trades found." : " No trades found for selected date."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead className="text-right">Profit (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrades.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.pair}</TableCell>
                    <TableCell
                      className={
                        txn.type === "Buy"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {txn.type}
                    </TableCell>
                    <TableCell
                      className={
                        txn.result === "Profit"
                          ? "text-green-600"
                          : txn.result === "Loss"
                          ? "text-red-600"
                          : "text-gray-500"
                      }
                    >
                      {txn.result}
                    </TableCell>
                    <TableCell className="text-right">
                      {txn.profit.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

export default TradeHistoryWidget;
