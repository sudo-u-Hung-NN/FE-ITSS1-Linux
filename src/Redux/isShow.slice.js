import { createSlice } from "@reduxjs/toolkit";

const isShowSlice = createSlice({
  name: "isShow",
  initialState: {
    show: false,
  },
  reducers: {
    setShowFalse: (state) => {
      state.show = false;
    },
    setShowTrue: (state) => {
      state.show = true;
    },
  },
});
export const { setShowTrue, setShowFalse } = isShowSlice.actions;
export default isShowSlice.reducer;
