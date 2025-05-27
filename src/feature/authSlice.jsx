import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Save user credentials
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;
