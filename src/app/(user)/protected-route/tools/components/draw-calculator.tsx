"use client";

import React, { useState } from "react";
import {
  calculateDraw,
  CalcInput,
  AssetClass,
} from "@/utils/tools/draw-calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DrawCalculator() {
  const [form, setForm] = useState<CalcInput>({
    assetClass: "forex",
    balance: 10000,
    riskPercent: 1,
    entry: 1.1,
    stopLoss: 1.095,
    takeProfit: 1.12,
  });
  const [result, setResult] = useState<any>(null);

  const handleChange = (key: keyof CalcInput, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleCalc = () => {
    setResult(calculateDraw(form));
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>📊 Draw Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Asset Class */}
        <Select
          value={form.assetClass}
          onValueChange={(v) => handleChange("assetClass", v as AssetClass)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Asset Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="forex">Forex</SelectItem>
            <SelectItem value="indices">Indices</SelectItem>
            <SelectItem value="crypto">Crypto</SelectItem>
            <SelectItem value="commodities">Commodities</SelectItem>
          </SelectContent>
        </Select>

        {/* Common Inputs */}
        <Input
          type="number"
          value={form.balance}
          onChange={(e) => handleChange("balance", parseFloat(e.target.value))}
          placeholder="Account Balance"
        />
        <Input
          type="number"
          value={form.riskPercent}
          onChange={(e) =>
            handleChange("riskPercent", parseFloat(e.target.value))
          }
          placeholder="Risk %"
        />
        <Input
          type="number"
          value={form.entry}
          onChange={(e) => handleChange("entry", parseFloat(e.target.value))}
          placeholder="Entry Price"
        />
        <Input
          type="number"
          value={form.stopLoss}
          onChange={(e) => handleChange("stopLoss", parseFloat(e.target.value))}
          placeholder="Stop Loss"
        />
        <Input
          type="number"
          value={form.takeProfit}
          onChange={(e) =>
            handleChange("takeProfit", parseFloat(e.target.value))
          }
          placeholder="Take Profit (optional)"
        />

        <Button onClick={handleCalc} className="w-fit">
          Calculate
        </Button>

        {/* Results */}
       
      </CardContent>
    </Card>
  );
}
