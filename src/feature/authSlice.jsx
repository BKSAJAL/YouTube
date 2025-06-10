import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
  channels: [],
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Save user credentials
    saveUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: () => initialState,
  },
});

export const { saveUser, logout } = authSlice.actions;
export default authSlice.reducer;
