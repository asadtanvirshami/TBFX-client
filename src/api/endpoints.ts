export const apiEndpoints = {
  auth: {
    signin: "/auth/signin",
    logout: "/auth/logout",
    signup: "/auth/signup",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
    reset: "/auth/reset",
    account_recovery: "/auth/account-recovery",
  },
  users: {
    base: "/users",
    one: (id: string) => `/users/${id}`,
  },
};
