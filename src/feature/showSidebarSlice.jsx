import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
};

const showSidebarSlice = createSlice({
  name: "showSidebar",
  initialState,
  reducers: {
    // handle sidebar
    handleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { handleSidebar } = showSidebarSlice.actions;
export default showSidebarSlice.reducer;
