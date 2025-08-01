import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // handle search
    handleSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { handleSearch } = searchSlice.actions;
export default searchSlice.reducer;
