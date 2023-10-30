import { createSlice } from "@reduxjs/toolkit";
import { folderServiceApi } from "~/app/services/folderService";
import { PaginationProps } from "~/types/globalTypes";
type Folder = {
  title: string;
  parentId?: string;
  ownerId: string;
};

export interface FolderState {
  users: Folder[];
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
