import { createSlice } from "@reduxjs/toolkit";
import { authServiceApi } from "~/app/services/authService";
import {
  saveOTP,
  savePassword,
  saveMnemonic,
  saveAddressWallet,
  saveUsername,
  saveAccessToken,
  saveRefreshToken,
  saveFcmToken,
  saveNonce,
} from "~/utils/storage";
export interface AuthState {
  mnemonic_encrypted?: string;
  otp?: string;
}

const initialState: AuthState = {
  otp: "",
  mnemonic_encrypted: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      if (!!action.payload.mnemonic_encrypted) {
        state.mnemonic_encrypted = action.payload.mnemonic_encrypted;
      }
    },
    logout(state, action) {
      saveOTP("");
      saveMnemonic("");
      savePassword("");
      saveAddressWallet("");
      saveUsername("");
      saveAccessToken("");
      saveRefreshToken("");
      saveFcmToken("");
    },
    setNonce(state, action) {
      saveNonce(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authServiceApi.endpoints.authLogin.matchFulfilled,
      (state, { payload }) => {
        if (payload.accessToken) {
          saveAccessToken(payload.token);
          saveRefreshToken(payload.refresh_token);
        }
        return {
          ...state,
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
        };
      }
    );
  },
});

export const { setAuthState, logout, setNonce } = authSlice.actions;

export default authSlice.reducer;
