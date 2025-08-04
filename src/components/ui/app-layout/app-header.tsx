"use client";

import React, { useEffect } from "react";
import { SidebarTrigger } from "../sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAccounts } from "@/hooks/trade_account/queries";
import { TradeAcc } from "@/types/account-type/type";
import { useAccountSwitch } from "@/hooks/trade_account/mutations";
import { useDispatch } from "react-redux";
import { setSelectedAccount } from "@/redux/slices/trade-account/trade_account-slice";

const SwitchAccountSelector = () => {
  const dispatch = useDispatch();
  const selectAccount = useAccountSwitch();
  const {
    data: accounts,
    isLoading: isLoadingAccount,
    isError: isErrorAccount,
  } = useGetAccounts();

  useEffect(() => {
    if (accounts?.metadata?.id) {
      dispatch(setSelectedAccount({ id: accounts.metadata.id }));
    }
  }, [accounts?.metadata?.id]);

  const handleAccountSwitch = (accountId: string) => {
    selectAccount.mutate(
      { id: accountId },
      {
        onSuccess: (data) => {
          console.log(data);
          dispatch(setSelectedAccount({ id: data.metadata.id }));
        },
      }
    );
  };

  if (isLoadingAccount || selectAccount.isPending)
    return (
      <div className="w-[180px] h-10 mx-2 my-2 rounded-md bg-gray-200 animate-pulse" />
    );

  if (isErrorAccount)
    return <div className="w-[180px] h-10 mx-2 my-2 rounded-md bg-gray-200" />;

  return (
    <div>
      <Select onValueChange={(value) => handleAccountSwitch(value)}>
        <SelectTrigger className="w-[180px] mx-2 my-2">
          <SelectValue placeholder="Select a Account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Accounts</SelectLabel>
            {accounts?.data?.map((account: TradeAcc) => (
              <SelectItem
                key={account.accountId}
                value={account.id}
                className="capitalize"
              >
                {account.accountId}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const AppHeader = () => {
  return (
    <div className="w-full border-b bg-card sticky top-0">
      <div className="w-full">
        <div className="flex items-center gap-2 justify-between">
          <div>
            <SidebarTrigger />
          </div>
          <SwitchAccountSelector />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AppHeader);
