"use client";

import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import type { TradeRaw } from "@/types/trade-type/type";
import {
  tradeSchema as rawTradeSchema,
  STATUSES,
  TRADE_TYPES,
} from "@/schemas/trade-schema/schema";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCreateTrade } from "@/hooks/trades/mutation";

type TradeType = (typeof TRADE_TYPES)[number];
type TradeStatus = (typeof STATUSES)[number];
type TradeFormValues = Omit<
  TradeRaw,
  "type" | "status" | "openDate" | "closeDate" | "createdAt" | "updatedAt"
> & {
  type: TradeType;
  status: TradeStatus;
  openDate: string | null;
  closeDate: string | null;
};

// If your imported schema is untyped, assert it to the form model so yupResolver matches:
const tradeSchema =
  rawTradeSchema as unknown as yup.ObjectSchema<TradeFormValues>;

function toFormDefaults(src?: Partial<TradeRaw>): TradeFormValues {
  return {
    id: src?.id ?? uuidv4(),
    ticket: src?.ticket ?? 0,
    accountNumber: src?.accountNumber ?? "",
    symbol: (src?.symbol ?? "").toUpperCase(),
    type: (src?.type as TradeType) ?? "BUY",
    lots: src?.lots ?? 0,
    openPrice: src?.openPrice ?? 0,
    closePrice: src?.closePrice ?? 0,
    profit: src?.profit ?? 0,
    openDate: src?.openDate
      ? new Date(src.openDate).toISOString().slice(0, 16)
      : "",
    closeDate: src?.closeDate
      ? new Date(src.closeDate).toISOString().slice(0, 16)
      : "",
    status: (src?.status as TradeStatus) ?? "OPEN",
    strategyTag: src?.strategyTag ?? "",
    slippage: src?.slippage ?? 0,
    note: src?.note ?? "",
    TradeAccounts: { id: "" },
  };
}

type TradeFormProps = {
  mode?: "add" | "edit";
  defaultValues?: Partial<TradeRaw>;
  onSubmit: (payload: Partial<TradeRaw>) => Promise<void> | void;
};

const TradeForm: React.FC<TradeFormProps> = ({
  mode = "add",
  defaultValues,
  onSubmit,
}) => {
  const trade_account = useSelector((state: RootState) => state.trade_account);
  const createTrade = useCreateTrade();
  const form = useForm<TradeFormValues>({
    resolver: yupResolver(tradeSchema),
    defaultValues: toFormDefaults({
      ...(defaultValues ?? {}),
    }),
    mode: "onBlur",
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const submit = async (values: TradeFormValues) => {
    // normalize to API payload
    const payload: Partial<TradeRaw> = {
      ...values,
      id: values.id || uuidv4(),
      symbol: (values.symbol || "").trim().toUpperCase(),
      ticket: values.ticket === ("" as any) ? 0 : Number(values.ticket),
      lots: values.lots === ("" as any) ? 0 : Number(values.lots),
      openPrice:
        values.openPrice === ("" as any) ? 0 : Number(values.openPrice),
      closePrice:
        values.closePrice === ("" as any) ? 0 : Number(values.closePrice),
      profit: values.profit === ("" as any) ? 0 : Number(values.profit),
      slippage:
        values.slippage === null ||
        values.slippage === ("" as any) ||
        values.slippage === undefined
          ? 0
          : Number(values.slippage),
      openDate: values.openDate ? new Date(values.openDate) : null,
      closeDate: values.closeDate ? new Date(values.closeDate) : null,
      TradeAccounts: { id: trade_account.current || "" },
    };
    createTrade.mutate(payload as TradeRaw, {});
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-6 w-[630px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name="ticket"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="0"
                      value={(field.value as any) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. BTCUSDT or EUR/USD"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      onBlur={(e) =>
                        field.onChange(e.target.value.trim().toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRADE_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="lots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lots</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      placeholder="0.00"
                      value={(field.value as any) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional note"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name="openPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.00001"
                      placeholder="0.00000"
                      value={(field.value as any) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="closePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Close Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.00001"
                      placeholder="0.00000"
                      value={(field.value as any) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="profit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      placeholder="0.00"
                      value={(field.value as any) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <FormField
                control={control}
                name="openDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Date</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={(field.value as any) ?? ""}
                        onChange={(e) => field.onChange(e.target.value || "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={control}
                name="closeDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Close Date</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={(field.value as any) ?? ""}
                        onChange={(e) => field.onChange(e.target.value || "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="min-w-[200px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="slippage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slippage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      placeholder="0.00"
                      value={(field.value as any) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <Button type="submit" variant={"success"} disabled={isSubmitting}>
            {isSubmitting
              ? mode === "edit"
                ? "Updating..."
                : "Saving..."
              : mode === "edit"
              ? "Update Trade"
              : "Save Trade"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default memo(TradeForm);
