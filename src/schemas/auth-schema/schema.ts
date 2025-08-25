import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signUpSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const otpSchema = yup.object({
  otp: yup.string().required("OTP is required"),
});

export const recoverySchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const signInMetaTraderSchema = yup.object({
  accountId: yup.string().required("accountId is required"),
  broker_server: yup.string().required("broker_server is required"),
  investor_password: yup.string().required("investor_password is required"),
  user: yup.string().required("user is required"),
  type: yup
    .string()
    .oneOf(["mt4", "mt5"], "Type must be either 'mt4' or 'mt5'")
    .required("Type is required"),
});

export const changePasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});