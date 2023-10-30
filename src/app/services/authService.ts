import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const authServiceApi = createApi({
  reducerPath: "authServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    authLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    authVerifyPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/verify/password",
        method: "POST",
        body: payload,
      }),
    }),
    contactUs: builder.mutation({
      query: (payload) => ({
        url: "/contact",
        method: "POST",
        body: payload
      })
    }),
    getToken: builder.mutation({
      query: (payload: any) => ({
        url: "/auth/admin/token",
        method: "POST",
        body: payload
      })
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useAuthLogoutMutation,
  useAuthVerifyPasswordMutation,
  useContactUsMutation,
  useGetTokenMutation
} = authServiceApi;
