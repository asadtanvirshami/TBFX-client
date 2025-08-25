"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordData } from "@/types/auth-type/type";
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
import { Eye, EyeOff, Loader2, PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeForm, openForm } from "@/redux/slices/ui/slice";
import React, { memo } from "react";
import { useResetPassword } from "@/hooks/auth/mutations";
import { handleError } from "@/utils/error-handler";
import { strategySchema } from "@/schemas/strategy-schema/schema";
import { StrategyData } from "@/types/strategy-type/type";

const StrategyForm = ({ buttonVisibility }: { buttonVisibility: boolean }) => {
  const [isHidden, setIsHidden] = React.useState<boolean>(true);

  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.ui.forms["strategy-form"]
  );

  const userId = useSelector((state: RootState) => state.user.user?.sub);
  const passwordMutation = useResetPassword(userId!);

  const form = useForm<StrategyData>({
    resolver: yupResolver(strategySchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      rules: [""],
      type: "manual",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ChangePasswordData) => {};

  return (
    <Dialog open={isOpen}>
      {buttonVisibility && (
        <DialogTrigger
          onClick={() => dispatch(openForm("change-password"))}
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
          <DialogTitle>Add Strategy</DialogTitle>
          <DialogDescription>
            Add a new strategy to your account and start trading.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        data-cy="#password"
                        type={isHidden ? "password" : "text"}
                        placeholder="XQER#(FDM@_!MX"
                        {...field}
                        className="pr-10"
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setIsHidden(!isHidden)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              data-cy="#confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        data-cy="#confirm_password"
                        type={isHidden ? "password" : "text"}
                        placeholder="XQER#(FDM@_!MX"
                        {...field}
                        className="pr-10"
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setIsHidden(!isHidden)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => dispatch(closeForm("strategy-form"))}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting}>
                Save
                {passwordMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(StrategyForm);
