import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const fileServiceApi = createApi({
  reducerPath: "fileServiceApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getFileByOwner: builder.query({
      query: (params) => ({
        url: `/files`,
        method: "GET",
        params: params,
      }),
    }),
    uploadFile: builder.mutation({
      query: (payload) => {
        return {
          url: "/files/upload",
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    getFileShareWithMe: builder.query({
      query: (params) => ({
        url: `/files/shared-me`,
        method: "GET",
        params: params,
      }),
    }),
    getTotalSize: builder.query({
      query: () => ({
        url: `/files/total-byte`,
        method: "GET",
      }),
    }),
    sharingPermissionsFile: builder.mutation({
      query: (payload) => {
        return {
          url: `/files/${payload.id}/sharing`,
          method: "PUT",
          body: payload.payload,
        };
      },
    }),
    updateStar: builder.mutation({
      query: (payload) => {
        return {
          url: `/files/${payload.id}/star`,
          method: "PUT",
          body: {isStar: payload.star},
        };
      },
    }),
    removeStart: builder.mutation({
      query: (payload) => {
        return {
          url: `/files/${payload.id}/remove-star`,
          method: "PUT",
          body: {isStar: payload.star},
        };
      },
    }),
    deleteFile: builder.mutation({
      query: (id: string) => {
        return {
          url: `/files/${id}`,
          method: "DELETE",
        };
      },
    }),
    removePermissionsFile: builder.mutation({
      query: (payload) => {
        return {
          url: `/files/${payload.id}/remove`,
          method: "PUT",
          body: payload.payload,
        };
      },
    }),
    updateFile: builder.mutation({
      query: (payload) => {
        return {
          url: `/files/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
    }),
  }),
});

export const {
  useDeleteFileMutation,
  useGetFileByOwnerQuery,
  useUploadFileMutation,
  useGetFileShareWithMeQuery,
  useSharingPermissionsFileMutation,
  useUpdateStarMutation,
  useRemovePermissionsFileMutation,
  useUpdateFileMutation,
  useRemoveStartMutation,
  useGetTotalSizeQuery
} = fileServiceApi;
