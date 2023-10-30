import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const folderServiceApi = createApi({
  reducerPath: "folderServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getFoldersByOwner: builder.query({
      query: (params) => ({
        url: `/folders`,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetFoldersByOwnerQuery } = folderServiceApi;
