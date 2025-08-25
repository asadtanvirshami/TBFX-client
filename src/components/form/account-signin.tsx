"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInMetaTraderSchema } from "@/schemas/auth-schema/schema";
import { MetaTraderFormData } from "@/types/auth-type/type";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeForm, openForm } from "@/redux/slices/ui/slice";
import React from "react";
import { useAccountSignin } from "@/hooks/trade_account/mutations";
import { useGetAccounts } from "@/hooks/trade_account/queries";

const AccountSignin = ({ buttonVisibility }: { buttonVisibility: boolean }) => {
  const dispatch = useDispatch();
  const { refetch } = useGetAccounts();
  const isOpen = useSelector(
    (state: RootState) => state.ui.forms["trade-account"]
  );

  const form = useForm<MetaTraderFormData>({
    resolver: yupResolver(signInMetaTraderSchema),
    defaultValues: {
      accountId: "",
      investor_password: "",
      broker_server: "",
      user: useSelector((state: RootState) => state.user.user)?.sub || "",
      type: "mt4",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const metaTraderMutation = useAccountSignin();

  const onSubmit = async (data: MetaTraderFormData) => {
    try {
      const response = await metaTraderMutation.mutateAsync(data);
      if (response.success) {
        refetch();
        dispatch(closeForm("trade-account"));
      } else {
        setError("accountId", {
          type: "server",
          message: response.message,
        });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <Dialog open={isOpen}>
      {buttonVisibility && (
        <DialogTrigger
          onClick={() => dispatch(openForm("trade-account"))}
          className="w-fit"
          asChild
        >
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add an account
          </Button>
        </DialogTrigger>
      )}

      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>MT4/MT5 Account</DialogTitle>
          <DialogDescription>
            Enter credentials below to add and sync your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      data-cy="#accountId"
                      placeholder="MT4/MT5 Account ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="investor_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investor Password</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="#investor_password"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="broker_server"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker Server</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="#broker_server"
                      type="text"
                      placeholder="demo.mql5.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => dispatch(closeForm("trade-account"))}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSignin;
