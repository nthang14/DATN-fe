import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params: any) => ({
        url: `/users`,
        method: "GET",
        params: params,
      }),
    }),
    getUsersNoParams: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
        params: { limit: 100000 },
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: `/users`,
        method: "POST",
        body: payload,
      }),
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/users`,
        method: "PUT",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: `/users/change-password`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersNoParamsQuery,
  useRegisterMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = userServiceApi;
