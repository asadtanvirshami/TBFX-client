"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/auth-schema/schema";
import { SignUpFormData } from "@/types/auth-type/type";
import { useSignup } from "@/hooks/auth/use-auth";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideLoaderCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { handleError } from "@/utils/error-handler";
import { extractErrorMessage } from "@/utils/error-extractor";
import { useTheme } from "next-themes";

import dark_logo from "../../../../../../public/assets/dark.png";
import light_logo from "../../../../../../public/assets/light.png";
import Image from "next/image";
import RecaptchaV2, { RecaptchaV2Handle } from "@/lib/recaptcha";

const SignUpForm = () => {
  const router = useRouter();
  const signup = useSignup();
  const { theme } = useTheme();
  const recaptchaRef = useRef<RecaptchaV2Handle>(null);

  const form = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  /**
   * @description Handle form submission to register a new user.
   * If the registration is successful, store the email in session storage
   * and redirect to the OTP page. If an error occurs during registration,
   * display an appropriate error message.
   *
   * @param {SignUpFormData} data - The form data containing user registration details.
   * @returns {Promise<void>}
   */

  const onSubmit = async (data: SignUpFormData) => {
    const token = await recaptchaRef.current?.execute();
    if (!token) throw new Error("Captcha missing");
    signup.mutate(
      { ...data, captcha: token },
      {
        onSuccess: (res) => {
          if (res?.success === false) {
            setError("root", {
              type: "server",
              message: res?.message || "Something went wrong",
            });
            return;
          }

          sessionStorage.setItem("email", data.email);
          router.push("/auth/signin");
        },
        onError: (error) => {
          handleError(error, {
            context: "SignupForm",
            notify: false,
            setFormError: (msg) => {
              form.setError("root", {
                type: "manual",
                message: msg,
              });
            },
          });
        },
      }
    );
  };

  return (
    <Card className="bg-card w-full md:w-[28rem] lg:w-[28rem] font-[family-name:var(--font-poppins)] !shadow-none fade-left !border-none">
      <CardHeader className="flex items-center gap-4">
        <Image
          src={theme === "dark" ? dark_logo : light_logo}
          alt="Logo"
          width={100}
          height={100}
          className="w-22"
        />
        <div>
          <CardTitle className="text-4xl !text-pink-400">Sign Up</CardTitle>
          <CardDescription>Enter credentials to continue.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="#firstName"
                      type="text"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="#lastName"
                      type="text"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="#email"
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="#password"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errors.root?.message && (
              <div className="text-xs text-red-600 text-center">
                {extractErrorMessage(errors.root.message)}
              </div>
            )}

            <Button
              type="submit"
              variant={"gradient"}
              disabled={isSubmitting || signup.isPending}
              className="w-full"
            >
              {isSubmitting || signup.isPending ? (
                <React.Fragment>
                  Signing up
                  <LucideLoaderCircle size={22} className="animate-spin ml-2" />
                </React.Fragment>
              ) : (
                "Sign Up"
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
        <CardFooter>
          <div className="w-full flex justify-center mt-3">
            <RecaptchaV2 ref={recaptchaRef} variant="checkbox" />
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
