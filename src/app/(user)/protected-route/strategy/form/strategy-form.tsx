"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import React, { memo, useEffect } from "react";
import { handleError } from "@/utils/error-handler";
import { StrategyData } from "@/types/strategy-type/type";
import { strategySchema } from "@/schemas/strategy-schema/schema";
import { useCreateStrategy } from "@/hooks/strategies/use-strategies";

const StrategyForm = ({ buttonVisibility }: { buttonVisibility: boolean }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.ui.forms["strategy-form"]
  );
  const isEdit = useSelector((state: RootState) => state.strategy.edit);
  const strategyValues = useSelector(
    (state: RootState) => state.strategy.values
  );
  const userId = useSelector((state: RootState) => state.user.user?.sub);

  const createMutation = useCreateStrategy();

  const form = useForm<StrategyData>({
    resolver: yupResolver(strategySchema),
    defaultValues: {
      title: "",
      comment: "",
      accessLevel: "STANDARD",
      price: 0,
      currency: "USD",
      status: "DRAFT",
      isPremium: false,
      hasPrice: false,
      userId: userId || "unknown",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: StrategyData) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        userId: userId || "unknown"
      });

      reset();
      dispatch(openForm("change-password"));
    } catch (err) {
      handleError({
        err,
      });
    }
  };
  useEffect(() => {
    if (isEdit && strategyValues) {
      reset(strategyValues);
    }
  }, [isEdit, strategyValues, reset]);

  return (
    <Dialog open={isOpen}>
      {buttonVisibility && (
        <DialogTrigger
          onClick={() => dispatch(openForm("strategy-form"))}
          className="w-fit"
          asChild
        >
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add an account
          </Button>
        </DialogTrigger>
      )}

      <DialogContent showCloseButton={false} className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Strategy</DialogTitle>
          <DialogDescription>
            Fill in the details for your strategy.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Grid layout: left (inputs), right (comment) */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left side */}
              <div className="flex flex-col gap-4">
                {/* Title */}
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My strategy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency */}
                <FormField
                  control={control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[280px]">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="PKR">PKR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[280px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right side */}
              <div className="overflow-y-auto max-h-92">
                <FormField
                  control={control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col overflow-y-auto">
                      <FormLabel>Comments</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea
                          className="h-full resize-none"
                          placeholder="Explain your strategy..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Footer buttons */}
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => dispatch(closeForm("strategy-form"))}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button variant={"success"} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(StrategyForm);
