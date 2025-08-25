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
import { useDispatch, useSelector } from "react-redux";
import {
  setAccountState,
  setSelectedAccount,
} from "@/redux/slices/trade-account/trade_account-slice";
import { Button } from "../button";
import { PlusCircle } from "lucide-react";
import { openForm } from "@/redux/slices/ui/slice";
import AccountSignin from "@/components/form/account-signin";
import { ModeToggle } from "../theme-provider/toggle-button";
import { RootState } from "@/redux/store";

const SwitchAccountSelector = () => {
  const dispatch = useDispatch();
  const selectAccount = useAccountSwitch();
  const account = useSelector((state: RootState) => state.trade_account);
  const {
    data: accounts,
    isLoading: isLoadingAccount,
    isError: isErrorAccount,
  } = useGetAccounts();

  useEffect(() => {
    if (accounts?.metadata?.id != null) {
      dispatch(
        setSelectedAccount({
          id: accounts?.metadata.id,
          accounts: accounts?.data,
          isLoading: false,
        })
      );
    }
    if (accounts?.metadata?.id === null) {
      dispatch(setAccountState({ accounts: null, isLoading: false }));
    }
  }, [accounts]);
  console.log(accounts,"acc");
  
  const handleAccountSwitch = (accountId: string) => {
    selectAccount.mutate(
      { id: accountId },
      {
        onSuccess: (data) => {
          dispatch(
            setSelectedAccount({
              id: data.metadata.id,
              accounts: data.data,
              isLoading: false,
            })
          );
        },
      }
    );
  };

  if (isLoadingAccount || selectAccount.isPending)
    return (
      <div className="w-[180px] h-10 mx-2 my-2 rounded-md bg-gray-500 animate-pulse" />
    );

  if (isErrorAccount)
    return <div className="w-[180px] h-10 mx-2 my-2 rounded-md bg-gray-200" />;

  return (
    <Select onValueChange={(value) => handleAccountSwitch(value)}>
      <SelectTrigger className="w-[180px] mx-2 my-2">
        <SelectValue placeholder="Select a Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          {accounts?.data?.map((account: TradeAcc, index: number) => (
            <>
              <SelectItem
                key={account.id}
                value={account.id}
                className="capitalize"
              >
                {account.accountId}
              </SelectItem>
              {index === accounts?.data.length - 1 && (
                <Button
                  onClick={() => dispatch(openForm("trade-account"))}
                  className="font-normal text-gray-400 cursor-pointer"
                  variant={"ghost"}
                  size="sm"
                >
                  <PlusCircle /> Add MT4/MT5 Account
                </Button>
              )}
            </>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const AppHeader = () => {
  return (
    <React.Fragment>
      <div className="w-full border-b bg-card sticky  top-0">
        <div className="w-full flex items-center justify-between ">
          <div>
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <ModeToggle />
            <SwitchAccountSelector />
          </div>
        </div>
      </div>
      <AccountSignin buttonVisibility={false} />
    </React.Fragment>
  );
};

export default React.memo(AppHeader);
