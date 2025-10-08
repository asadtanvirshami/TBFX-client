"use client";

import { closeDialog } from "@/redux/slices/dialog/dialog-slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TradeForm from "@/components/form/trades/trade-form";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import StrategyForm from "@/app/(user)/protected-route/strategy/form/strategy-form";
// import AccountForm from "@/components/form/accounts/account-form"; // Example

export default function AppDialog() {
  const { isOpen, formType, mode, data, size } = useSelector(
    (state: RootState) => state.dialog
  );
  const dispatch = useDispatch();

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <DialogContent className={`sm:max-w-${size} w-fit min-w-[300px] min-h-[200px]`}>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit" : "Add"}{" "}
            {formType === "trade" ? "Trade" : "Form"}
          </DialogTitle>
        </DialogHeader>
        {formType === "strategy" && <StrategyForm mode={mode} defaultValues={data} />}
        {formType === "trade" && <TradeForm mode={mode} defaultValues={data} />}
        {/* Example: 
        {formType === "account" && <AccountForm mode={mode} defaultValues={data} />} 
        */}
      </DialogContent>
    </Dialog>
  );
}
