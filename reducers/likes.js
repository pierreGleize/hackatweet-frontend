import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const likeTweetsSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    likeTweet: (state, action) => {
      state.value.push(action.payload);
    },
    unlikeTweet: (state, action) => {
      state.value = state.value.filter((tweet) => tweet !== action.payload);
    },
    resetLikes: (state, action) => {
      state.value = [];
    },
  },
});

export const { likeTweet, unlikeTweet, resetLikes } = likeTweetsSlice.actions;
export default likeTweetsSlice.reducer;
