import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  sub: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    updateProfile(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutUser(state) {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, updateProfile, loginFailure, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
