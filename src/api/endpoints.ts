export const apiEndpoints = {
  auth: {
    signin: "/auth/signin",
    google: "/auth/google-signin",
    logout: "/auth/logout",
    signup: "/auth/signup",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
    reset: "/auth/reset",
    account_recovery: "/auth/account-recovery",
    me: "/auth/me",
    verifyJWT: "/auth/verify-session",
  },
  users: {
    base: "/users",
    me: "/users/me",
    one: (id: string) => `/users/${id}`,
  },
};
