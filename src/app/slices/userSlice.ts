import { createSlice } from "@reduxjs/toolkit";
import { userServiceApi } from "~/app/services/userService";
import { PaginationProps } from "~/types/globalTypes";
type User = {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
};

export interface UserState {
  users: User[];
  pagination: PaginationProps;
}

const initialState: UserState = {
  users: [],
  pagination: {
    page: 1,
    total: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload.list;
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getUsers } = userSlice.actions;

export default userSlice.reducer;
