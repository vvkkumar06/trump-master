import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
