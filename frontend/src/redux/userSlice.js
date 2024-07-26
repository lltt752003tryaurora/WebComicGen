// đây là nơi lấy và lưu lại data của user ở localStorage

import { createSlice } from "@reduxjs/toolkit";

// const dataUserLocal = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // user: dataUserLocal,
};

const userSlice = createSlice({
  
});

// Action creators are generated for each case reducer function
export const { setDataUser } = userSlice.actions;

export default userSlice.reducer;
