import * as yup from "yup";

export const TRADE_TYPES = ["BUY", "SELL", "LONG", "SHORT"] as const;
export const STATUSES = ["OPEN", "CLOSED", "PENDING", "CANCELLED"] as const;

export const tradeSchema = yup.object({
  id: yup.string().optional(),
  ticket: yup
    .number()
    .typeError("Ticket must be a number")
    .integer("Ticket must be an integer")
    .min(0, "Ticket cannot be negative")
    .required("Ticket is required"),
  accountNumber: yup.string().trim(),
  symbol: yup
    .string()
    .transform((v?: string) =>
      typeof v === "string" ? v.trim().toUpperCase() : v
    )
    .matches(/^[A-Z0-9/._-]+$/, "Invalid symbol")
    .required("Symbol is required"),
  type: yup
    .mixed<(typeof TRADE_TYPES)[number]>()
    .oneOf([...TRADE_TYPES], "Invalid type")
    .required("Type is required"),
  lots: yup
    .number()
    .typeError("Lots must be a number")
    .min(0, "Lots cannot be negative")
    .required("Lots is required"),
  openPrice: yup
    .number()
    .typeError("Open price must be a number")
    .min(0, "Open price cannot be negative")
    .required("Open price is required"),
  closePrice: yup
    .number()
    .typeError("Close price must be a number")
    .min(0, "Close price cannot be negative")
    .default(0),
  profit: yup.number().typeError("Profit must be a number").default(0),
  openDate: yup
    .string()
    .nullable()
    .test(
      "valid-open-date",
      "Invalid open date",
      (v) => !v || !isNaN(Date.parse(v))
    ),
  closeDate: yup
    .string()
    .nullable()
    .test(
      "valid-close-date",
      "Invalid close date",
      (v) => !v || !isNaN(Date.parse(v))
    )
    .test(
      "close-after-open",
      "Close date cannot be before open date",
      function (v) {
        const open = this.parent.openDate;
        if (!v || !open) return true;
        return new Date(v).getTime() >= new Date(open).getTime();
      }
    ),
  status: yup
    .mixed<(typeof STATUSES)[number]>()
    .oneOf([...STATUSES], "Invalid status")
    .required("Status is required"),
  strategyTag: yup.string().nullable().default(""),
  slippage: yup
    .number()
    .typeError("Slippage must be a number")
    .nullable()
    .default(0),
  note: yup.string().nullable().default(""),
});
