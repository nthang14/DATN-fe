import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUserByAddress: builder.query({
      query: (address: string) => ({
        url: `/users/${address}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserByAddressQuery } = userServiceApi;
