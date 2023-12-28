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
    createFolder: builder.mutation({
      query: (payload) => {
        return {
          url: "/folders",
          method: "POST",
          body: payload,
        };
      },
    }),
    getFolderShareWithMe: builder.query({
      query: (params) => ({
        url: `/folders/shared-me`,
        method: "GET",
        params: params,
      }),
    }),
    sharingPermissions: builder.mutation({
      query: (payload) => {
        return {
          url: `/folders/${payload.id}/sharing`,
          method: "PUT",
          body: payload.payload,
        };
      },
    }),
    updateStarFolder: builder.mutation({
      query: (payload) => {
        return {
          url: `/folders/${payload.id}/star`,
          method: "PUT",
        };
      },
    }),
    removeStarFolder: builder.mutation({
      query: (payload) => {
        return {
          url: `/folders/${payload.id}/remove-star`,
          method: "PUT",
        };
      },
    }),
    deleteFolder: builder.mutation({
      query: (id: string) => {
        return {
          url: `/folders/${id}`,
          method: "DELETE",
        };
      },
    }),
    removePermissionsFolder: builder.mutation({
      query: (payload) => {
        return {
          url: `/folders/${payload.id}/remove`,
          method: "PUT",
          body: payload.payload,
        };
      },
    }),
    updateFolder: builder.mutation({
      query: (payload) => {
        return {
          url: `/folders/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
    }),
  }),
});

export const {
  useGetFoldersByOwnerQuery,
  useCreateFolderMutation,
  useGetFolderShareWithMeQuery,
  useSharingPermissionsMutation,
  useDeleteFolderMutation,
  useUpdateStarFolderMutation,
  useRemovePermissionsFolderMutation,
  useUpdateFolderMutation,
  useRemoveStarFolderMutation
} = folderServiceApi;
