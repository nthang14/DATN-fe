import { createSlice } from "@reduxjs/toolkit";
import { authServiceApi } from "~/app/services/authService";
import {
  saveAccessToken,
  saveRefreshToken,
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

export const { } = authSlice.actions;

export default authSlice.reducer;
