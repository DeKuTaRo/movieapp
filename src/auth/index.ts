import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../assets/data";

interface AuthState {
  user: User | null;
}

const initialState = {
  user: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
