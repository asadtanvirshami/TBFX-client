import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface TradeAccount {
  id: string;
  accountId: string;
  investor_password: string;
  broker_server: string;
  type: string;
}

interface AccountState {
  account: string | null;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AccountState = {
  account: null,
  error: null,
  isAuthenticated: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<{ id: string }>) => {
      state.account = action.payload.id;
      state.error = null;
      state.isAuthenticated = true;
    },
    activeAccount(state, action: PayloadAction<{ id: string }>) {
      state.account = action.payload.id;
      state.error = null;
      state.isAuthenticated = true;
    },
    logoutAccount(state) {
      state.account = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const { activeAccount, setSelectedAccount, logoutAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
