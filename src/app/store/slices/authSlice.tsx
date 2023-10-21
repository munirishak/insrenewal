import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuth: boolean;
  sessionDetails: any;
}

const initialState: IAuthState = {
  isAuth: false,
  sessionDetails: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.sessionDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setSession } = authSlice.actions;

export const authReducer = authSlice.reducer;