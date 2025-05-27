import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    // handle Videos
    handleVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { handleVideos } = videosSlice.actions;
export default videosSlice.reducer;
