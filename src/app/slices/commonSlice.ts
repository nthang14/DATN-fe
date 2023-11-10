import { createSlice } from "@reduxjs/toolkit";

export interface CommonState {
  isShowNotify?: boolean;
  notifyContent?: string;
  typeAlert?: string;
  progressNumber?: number;
  loading?: boolean;
  showLoading?: boolean;
  isReload?: boolean;

}

const initialState: CommonState = {
    isShowNotify: false,
    notifyContent: "",
    typeAlert: "success",
    progressNumber: 0,
    loading: false,
    showLoading: true,
    isReload: false
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setNotify (state, action) {
        state.isShowNotify = action.payload.isShowNotify
        state.notifyContent = action.payload.notifyContent
        state.typeAlert = action.payload.typeAlert
    },
    setProgress (state, action) {
      state.progressNumber = action.payload
      state.typeAlert = action.payload.typeAlert || "success";
    },
    setLoading (state, action) {
      state.loading = action.payload
    },
    setShowLoading (state, action) {
      state.showLoading = action.payload
    },
    setIsReload (state, action) {
      state.isReload = action.payload
    }
  },
});

export const { setNotify, setProgress, setLoading, setShowLoading, setIsReload } = commonSlice.actions;

export default commonSlice.reducer;
