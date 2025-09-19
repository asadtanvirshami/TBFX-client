"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/schemas/auth-schema/schema";
import { useResetPassword } from "@/hooks/auth/use-auth";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideLoaderCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { handleError } from "@/utils/error-handler";
import { extractErrorMessage } from "@/utils/error-extractor";
import { ResetPasswordInput } from "@/hooks/auth/types";

const ResetForm = () => {
  const router = useRouter();
  const resetPassword = useResetPassword();
  // Get token from URL
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const token = params.get("token");

  const form = useForm<ResetPasswordInput>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      token: token || "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * @description Handle form submission, send a recovery link to the user and redirect to OTP page
   * @param {RecoveryFormData} data Form data
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: ResetPasswordInput) => {
    resetPassword.mutate(data, {
      onSuccess: (res) => {
        if (res?.success === false) {
          setError("root", {
            type: "server",
            message: res?.message || "Something went wrong",
          });
          return;
        }
      },
      onError: (error) => {
        handleError(error, {
          context: "resetForm",
          notify: false,
          setFormError: (msg) => {
            form.setError("root", {
              type: "manual",
              message: msg,
            });
          },
        });
      },
    });
  };

  return (
    <Card className="border bg-card w-full md:w-[28rem] lg:w-[28rem] font-[family-name:var(--font-poppins)] fade-left   ">
      <CardHeader>
        <CardTitle className="text-4xl !text-pink-400">
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter password and make sure it is strong. Do not share it with
          anyone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errors.root?.message && (
              <div className="text-sm text-red-600 text-center">
                {extractErrorMessage(errors.root.message)}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || resetPassword.isPending}
            >
              {isSubmitting || resetPassword.isPending ? (
                <React.Fragment>
                  Loading
                  <LucideLoaderCircle size={22} className="animate-spin ml-2" />
                </React.Fragment>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>

        <Separator className="my-4" />

        <div className="flex justify-between mt-4">
          <Link
            href="/auth/signin"
            className="text-xs text-gray-600 hover:text-blue-500"
          >
            Already have an account.
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetForm;
