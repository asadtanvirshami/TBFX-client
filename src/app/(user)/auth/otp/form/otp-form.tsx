import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "@/schemas/auth-schema/schema";
import { OTPFormData } from "@/types/auth-type/type";
import { useResendOtp, useVerifyOtp } from "@/hooks/auth/use-auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { handleError } from "@/utils/error-handler";
import { useRouter } from "next/navigation";
import { extractErrorMessage } from "@/utils/error-extractor";

/**
 * A form to verify the OTP sent to the user's email.
 *
 * It will automatically redirect to the homepage if the OTP is correct.
 *
 * @returns A form with an OTP input field and a button to resend the OTP.
 */

const OtpForm = () => {
  const resendOtp = useResendOtp();
  const verifyOtp = useVerifyOtp();
  const router = useRouter();

  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const form = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (otpSent) {
      setTimeLeft(60); // 60 seconds

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setOtpSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [otpSent]);

  /**
   * Submits the OTP form.
   *
   * If the OTP is valid, it will remove the email from the session storage and
   * redirect to the homepage.
   *
   * If the OTP is invalid, it will display an error message.
   *
   * @param data - The OTP form data.
   */
  const onSubmit = async (data: OTPFormData) => {
    verifyOtp.mutate(
      { otp: data.otp },
      {
        onSuccess: (res) => {
          console.log(res);

          if (res.success === false) {
            setError("root", {
              type: "server",
              message: res.message || "Something went wrong",
            });
          }
          if (res.success === true) {
            sessionStorage.removeItem("email");
            router.push("/");
          }
        },
        onError: (error) => {
          handleError(error, {
            context: "OtpForm",
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
   * @description Handle resend OTP button click
   * @returns {Promise<void>}
   */
  const onResend = async () => {
    const email = sessionStorage.getItem("email")?.toString();
    resendOtp.mutate(
      { email: email || "" },
      {
        onSuccess: (res) => {
          if (res.success === false) {
            setError("root", {
              type: "server",
              message: res.message || "Something went wrong",
            });
            return;
          }
          if (res.success === true) {
            form.clearErrors();
            setOtpSent(true);
          }
        },
        onError: (error) => {
          handleError(error, {
            context: "OtpForm",
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
    <Card className=" w-full md:w-[28rem] lg:w-[28rem] font-[family-name:var(--font-poppins)] !shadow-none fade-left !bg-transparent !border-none">
      <CardHeader>
        <CardTitle className="text-4x !text-pink-400">Verify OTP</CardTitle>
        <CardDescription>
          Enter your otp that was sent on your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-full mx-auto"
          >
            <div className="flex justify-center">
              <FormField
                control={control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting || verifyOtp.isPending ? (
                <React.Fragment>
                  Confirming OTP
                  <LucideLoaderCircle size={22} className="animate-spin" />
                </React.Fragment>
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </Form>
        <Separator className="my-3" />
        <div>
          <div className="flex gap-6 justify-between mt-4">
            <Button
              type="button"
              variant={"link"}
              disabled={timeLeft > 0}
              onClick={onResend}
              className="text-xs text-gray-600 hover:text-blue-500"
            >
              resend OTP
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="row">
          {errors.root?.message && (
            <div className="text-xs text-red-600 text-center">
              {extractErrorMessage(errors.root.message)}
            </div>
          )}

          <div>
            {otpSent && (
              <div className="text-xs text-center">
                OTP sent successfully. Retry after {timeLeft} seconds.
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OtpForm;
