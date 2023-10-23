import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUsersState {
  users: PageData;
}

const initialState: IUsersState = {
  users: {
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: [],
  },
};

export type UserType = {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  masked_email: string;
  show_email?: boolean;
};

export type PageData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserType[];
};

export const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<PageData>) => {
      if (action.payload.page === 1) {
        state.users = action.payload;
      } else {
        state.users = {
          ...action.payload,
          data: [
            ...state.users.data,
            ...action.payload?.data?.filter((row: UserType) => {
              const isExist = state.users.data.find((usr) => usr.id === row.id);
              return !isExist;
            }),
          ],
        };
      }
    },
    toggleEmail: (state, action: PayloadAction<number>) => {
      state.users.data = state.users.data?.map(
        (usr: UserType, inIdx: number) => {
          return {
            ...usr,
            show_email:
              action.payload === inIdx ? !usr.show_email : usr.show_email,
          };
        }
      );
    },

    clearUsers: (state) => {
      state.users = initialState.users;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsersList, toggleEmail, clearUsers } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
