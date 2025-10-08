"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schemas/auth-schema/schema";
import { SignInFormData } from "@/types/auth-type/type";
import { useGoogleSignin } from "@/hooks/auth/use-auth";
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
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { loginSuccess } from "@/redux/slices/user/user-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { handleError } from "@/utils/error-handler";
import { useUser } from "@/hooks/user/use-user";
import { useSignin } from "@/hooks/auth/use-auth";
import { extractErrorMessage } from "@/utils/error-extractor";
import Image from "next/image";
import { useTheme } from "next-themes";

import dark_logo from "../../../../../../public/assets/dark.png";
import light_logo from "../../../../../../public/assets/light.png";
import RecaptchaV2, { RecaptchaV2Handle } from "@/lib/recaptcha";
/**
 * SignInForm
 *
 * @description Form component for signing in.
 *
 * @param {Object} props Component props
 * @param {ReactNode} children Form children
 *
 * @returns {ReactElement} Form element
 */
export const SignInForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const signin = useSignin();
  const googleSignin = useGoogleSignin();
  const recaptchaRef = useRef<RecaptchaV2Handle>(null);

  const dispatch = useDispatch();
  const { refetch } = useUser();
  const form = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  /**
   * @description Handle form submission, login the user and redirect to dashboard
   * @param {SignInFormData} data Form data
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: SignInFormData) => {
    const token = await recaptchaRef.current?.execute();
    if (!token) throw new Error("Captcha missing");

    signin.mutate(
      { email: data.email, password: data.password, captcha: token },
      {
        /**
         * @description Handle successful login response
         * @param {SignInResponse} data Response data
         * @returns {void}
         */
        onSuccess: async (data) => {
          if (data.accessToken === null || data.success === false) {
            setError("email", {
              type: "server",
            });
            setError("password", {
              type: "server",
              message: "Invalid email or password",
            });
            return;
          }

          const result = await refetch();

          if (result.isError) return;

          if (result.data.valid === true) {
            dispatch(loginSuccess(result.data.user));
            form.reset();
            router.push("/protected-route/dashboard");
          }
        },
        onError: (error) => {
          handleError(error, {
            context: "Signin-Form",
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

  /**
   * @description Handle successful response from Google Sign-in
   * @param {GoogleCredentialResponse} credentialResponse Response from Google
   * @returns {Promise<void>}
   */
  const handleGoogleSuccess = async (
    credentialResponse: GoogleCredentialResponse
  ) => {
    if (!credentialResponse?.credential) return;
    const token = await recaptchaRef.current?.execute();
    if (!token) throw new Error("Captcha missing");

    const googleCredentials = credentialResponse.credential;
    googleSignin.mutate(
      { token: googleCredentials, captcha: token },
      {
        onSuccess: async (data) => {
          if (data.accessToken === null || data.success === false) {
            return;
          }

          const result = await refetch();
          if (result.isError) return;
          dispatch(loginSuccess(result.data.user));
           router.push(data.redirectTo );
        },
        onError: (error) => {
          handleError(error, {
            context: "Signin-Form",
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

  /**
   * @description Handle an error from the Google Sign-in
   * @returns {void}
   */
  const handleGoogleError = () => {
    handleError("Google-Signin-Error", {
      context: "Google-Signin",
      notify: false,
      setFormError: (msg) => {
        form.setError("root", {
          type: "manual",
          message: msg,
        });
      },
    });
  };

  return (
    <Card className="bg-card w-full md:w-[28rem] lg:w-[28rem] font-[family-name:var(--font-poppins)] !shadow-none fade-left">
      <CardHeader className="flex items-center gap-4">
        <Image
          src={theme === "dark" ? dark_logo : light_logo}
          alt="Logo"
          width={100}
          height={100}
          className="w-22"
        />
        <div>
          <CardTitle className="text-4xl !text-pink-400">Sign In</CardTitle>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      data-cy="#email"
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
            <div className="flex flex-col">
              <Button
                type="submit"
                variant={"gradient"}
                disabled={form.formState.isSubmitting}
              >
                {isSubmitting || signin.isPending ? (
                  <React.Fragment>
                    Signing in
                    <LucideLoaderCircle size={22} className="animate-spin" />
                  </React.Fragment>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* <div className="flex justify-center mt-5">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
              </div> */}
            </div>
            {errors.root?.message && (
              <div className="text-xs text-red-600 text-center">
                {extractErrorMessage(errors.root.message)}
              </div>
            )}
          </form>
        </Form>
        <Separator className="my-3" />
        <div>
          <div className="flex gap-6 justify-between mt-4">
            <Link
              href="/auth/account-recovery"
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
            <Link
              href="/auth/signup"
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              Create a new acccount.
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-center">
          <RecaptchaV2 ref={recaptchaRef} variant="checkbox" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
