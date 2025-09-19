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

export const useSignin = () =>
  useMutation({
    mutationFn: (input: LoginInput) =>
      api
        .post(apiEndpoints.auth.signin, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useGoogleSignin = () =>
  useMutation({
    mutationFn: (input: GooginSigninInput) =>
      api
        .post(apiEndpoints.auth.google, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });

export const useSignup = () =>
  useMutation({
    mutationFn: (input: SignupInput) =>
      api
        .post(apiEndpoints.auth.signup, sanitizeFlatStrings(input))
        .then((res) => res.data),
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
        .post(
          apiEndpoints.auth.reset_password,
          sanitizeFlatStrings(input)
        )
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
