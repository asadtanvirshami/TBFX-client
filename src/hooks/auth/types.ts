export interface LoginInput {
  [key: string]: string;
  email: string;
  password: string;
  captcha: string;
}

export interface SignupInput {
  [key: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  captcha: string;
}

export interface GooginSigninInput {
  [key: string]: string;
  token: string;
  captcha: string;
}
export interface OtpInput {
  [key: string]: string;
  otp: string;
}

export interface ChangePasswordInput {
  [key: string]: string;
  id: string;
  password: string;
}
export interface ResetPasswordInput {
  [key: string]: string;
  password: string;
  confirm_password: string;
  token: string;
}
export interface AccountRecoveryInput {
  [key: string]: string;
  email: string;
}
export interface ResendOTPInput {
  [key: string]: string;
  email: string;
}
