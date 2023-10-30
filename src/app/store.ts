import { configureStore } from "@reduxjs/toolkit";
import { authServiceApi } from "~/app/services/authService";
import authSlice from "~/app/slices/authSlice";
import userSlice from "~/app/slices/userSlice";
import { userServiceApi } from "~/app/services/userService";
import commonSlice from "~/app/slices/commonSlice";
import { folderServiceApi } from "~/app/services/folderService";
import folderSlice from "~/app/slices/folderSlice";
export const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    [authServiceApi.reducerPath]: authServiceApi.reducer,

    user: userSlice,
    [userServiceApi.reducerPath]: userServiceApi.reducer,

    folder: folderSlice,
    [folderServiceApi.reducerPath]: folderServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authServiceApi.middleware)
      .concat(userServiceApi.middleware)
      .concat(folderServiceApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
