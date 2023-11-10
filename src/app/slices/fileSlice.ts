import { createSlice } from "@reduxjs/toolkit";
import { folderServiceApi } from "~/app/services/folderService";
import { PaginationProps } from "~/types/globalTypes";
type File = {
  title: string;
  parentId?: string;
  ownerId: string;
  ggId:string;
  fileExtension: string;
  webContentLink: string;
  fileSize: number;
  thumbnailLink: string;
  iconLink: string;
  updatedAt: string;
};

export interface FolderState {
  users: File[];
  pagination: PaginationProps;
}

const initialState: FolderState = {
  users: [],
  pagination: {
    page: 1,
    total: 0,
  },
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
  },
});

export const {  } = folderSlice.actions;

export default folderSlice.reducer;
