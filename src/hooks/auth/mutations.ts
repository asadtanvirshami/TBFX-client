import { useMutation } from "@tanstack/react-query";
import { sanitizeFlatStrings } from "@/utils/sanitize";
import { apiEndpoints } from "@/api/endpoints";
import api from "@/api/axios";
import {
  LoginInput,
  SignupInput,
  GooginSigninInput,
  OtpInput,
  AccountRecoveryInput,
  ResendOTPInput,
  ResetPasswordInput,
} from "./types";

export type SigninResponse = {
  success: boolean;
  accessToken?: string;
  redirectTo?: string // if your API returns JWT instead of setting cookie
};

function makeIdempotencyKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now();
}

export const useSignin = () =>
  useMutation<SigninResponse, LoginInput, LoginInput>({
    mutationKey: ["auth", "signin"],
    mutationFn: async (input) => {
      const idKey = makeIdempotencyKey();
      console.log(input);
      
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15_000);

      try {
        // Don’t send captcha token inside body; keep it in header only.
        const payload = {
          email: input.email.trim(),
          password: input.password,
        };

        const res = await api.post<SigninResponse>(
          apiEndpoints.auth.signin,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "x-recaptcha-token": input.captcha,
              "idempotency-key": idKey,
            },
            withCredentials: true, // allow server to set HttpOnly auth cookie
            signal: controller.signal,
          }
        );

        return res.data;
      } finally {
        clearTimeout(t);
      }
    },
    // Don’t retry on auth/validation; do limited retries on transient errors
    retry(failureCount, error: any) {
      const status = error?.response?.status;
      if (status && [400, 401, 403, 422].includes(status)) return false;
      return failureCount < 2; // at most 2 retries
    },
    retryDelay(attempt) {
      // jittered exponential backoff
      return Math.min(1000 * 2 ** attempt, 5000) + Math.random() * 300;
    },
  });

export const useGoogleSignin = () =>
  useMutation({
    mutationFn: (input: GooginSigninInput) =>
      api
        .post(apiEndpoints.auth.google, sanitizeFlatStrings(input), {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-recaptcha-token": input.recaptchaToken,
          },
        })
        .then((res) => res.data),
  });

export const useSignup = () =>
  useMutation<{ success: boolean; message: string }, SignupInput, SignupInput>({
    mutationKey: ["auth", "signup"],
    mutationFn: async (input) => {
      const idKey = makeIdempotencyKey();

      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15_000);

      try {
        // Don’t send captcha token inside body; keep it in header only.
        const payload = {
          email: input.email.trim(),
          password: input.password,
          firstName: input.firstName.trim(),
          lastName: input.lastName.trim(),
        };

        const res = await api.post<{ success: boolean; message: string }>(
          apiEndpoints.auth.signup,
          sanitizeFlatStrings(payload),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "x-recaptcha-token": input.captcha,
              "idempotency-key": idKey,
            },
            withCredentials: true, // allow server to set HttpOnly auth cookie
            signal: controller.signal,
          }
        );

        return res.data 
      } finally {
        clearTimeout(t);
      }
    },
    // Don’t retry on auth/validation; do limited retries on transient errors
    retry(failureCount, error: any) {
      const status = error?.response?.status;
      if (status && [400, 401, 403, 422].includes(status)) return false;
      return failureCount < 2; // at most 2 retries
    },
    retryDelay(attempt) {
      // jittered exponential backoff
      return Math.min(1000 * 2 ** attempt, 5000) + Math.random() * 300;
    },
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: (input: OtpInput) =>
      api
        .post(apiEndpoints.auth.verifyOtp, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: (input: ResendOTPInput) =>
      api
        .post(apiEndpoints.auth.resendOtp, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (input: ResetPasswordInput) =>
      api
        .post(apiEndpoints.auth.reset_password, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useAccountRecovery = () =>
  useMutation({
    mutationFn: (input: AccountRecoveryInput) =>
      api
        .post(apiEndpoints.auth.forgot_password, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () =>
      api.post(apiEndpoints.auth.logout).then((res) => res.data),
  });

export const useVerify = () =>
  useMutation({
    mutationFn: () => api.get(apiEndpoints.auth.verify).then((res) => res.data),
  });
