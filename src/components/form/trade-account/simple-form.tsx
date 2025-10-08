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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React from "react";
import { useAccountSignin } from "@/hooks/trade_account/mutations";
import { useGetAccounts } from "@/hooks/trade_account/queries";

// Add these imports for Card UI
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const SimpleForm = () => {
  const dispatch = useDispatch();
  const { refetch } = useGetAccounts();
  const user = useSelector((state: RootState) => state.user.user);

  const form = useForm<MetaTraderFormData>({
    resolver: yupResolver(signInMetaTraderSchema),
    defaultValues: {
      accountId: "",
      investor_password: "",
      broker_server: "",
      user: user?.sub || "",
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
    <Card className="!bg-transparent !border-none w-full md:w-[28rem] lg:w-[28rem] font-[family-name:var(--font-poppins)] !shadow-none fade-left">
      <CardHeader>
        <CardTitle>MT4/MT5 Account</CardTitle>
        <CardDescription>
          Enter credentials below to add and sync your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <CardFooter className="flex justify-between gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Setting up account..." : "Confirm"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SimpleForm;
