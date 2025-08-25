export interface MetaTraderFormData {
  accountId: string;
  investor_password: string;
  broker_server: string;
  user: string;
  type: "mt4" | "mt5";
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface OTPFormData {
  otp: string;
}

export interface RecoveryFormData {
  email: string;
}

export interface ChangePasswordData {
  password: string;
  confirm_password: string;
}
