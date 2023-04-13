import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../Actions/fetchuser-actions";

const initialState = {
  users: [],
  notifications: [],
  show: false,
  search: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.notifications = {
        status: "success",
        title: "Success!",
        message: "Cart data sent successfully!",
      };
    },
    [fetchUsers.rejected]: (state, action) => {
      state.notifications = {
        status: "error",
        title: "Error!",
        message: action.error.message || "Fetch failed",
      };
    },
    [fetchUsers.pending]: (state) => {
      state.notifications = {
        status: "pending",
        title: "Pending ...",
        message: "Loading...",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const uiActions = userSlice.actions;

export default userSlice.reducer;
