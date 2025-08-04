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
    verifyJWT: "/auth/verify-session",
    verify: "/auth/verify",
  },
  users: {
    base: "/user",
    me: "/user/me",
    one: (id: string) => `/user/${id}`,
  },
  trades: {
    base: "/trade",
    get: "/trade/get",
    stats: "/trade/get-stats",
  },
  news: {
    base: "/news",
    get: "/news/get",
    stats: "/trade/get-stats",
  },
  trade_account: {
    base: "/trade-account",
    get: "/trade-account/get",
    active: "/trade-account/active",
    switch: "/trade-account/switch",
  },
  dashboard: {
    base: "/dashboard",
    stats: "/dashboard/stats",
  },
};
