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
