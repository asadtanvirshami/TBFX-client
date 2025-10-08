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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import React, { memo } from "react";
import { handleError } from "@/utils/error-handler";
import { StrategyData } from "@/types/strategy-type/type";
import { strategySchema } from "@/schemas/strategy-schema/schema";
import { useCreateStrategy } from "@/hooks/strategies/use-strategies";
import { closeDialog } from "@/redux/slices/dialog/dialog-slice";

interface StrategyFormProps {
  buttonVisibility?: boolean;
  mode?: "add" | "edit";
  defaultValues?: Partial<StrategyData>;
}

const StrategyForm = ({
  mode = "add",
  defaultValues = {},
}: StrategyFormProps) => {
  const dispatch = useDispatch();
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
      ...defaultValues,
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
      if (mode === "edit" && defaultValues?.id) {
        // await updateMutation.mutateAsync({ ...data, id: defaultValues.id });
      } else {
        await createMutation.mutateAsync({
          ...data,
          userId: userId || "unknown",
        });
      }

      reset();
      dispatch(closeDialog());
    } catch (err) {
      handleError({ err });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Left side */}
          <div className="flex flex-col gap-4">
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
                      <SelectTrigger className="min-w-[250px]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <SelectTrigger className="min-w-[250px]">
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
          <div className="overflow-y-auto min-h-42 max-h-92">
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

        <div>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : mode === "edit"
              ? "Update Strategy"
              : "Save Strategy"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default memo(StrategyForm);
