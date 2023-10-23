
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import { IAuthState, authReducer } from "./slices/authSlice";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import { IUsersState, usersReducer } from "./slices/usersSlice";
 
const persistConfig = {
  key: 'root',
  storage,
}

export type ReducerType = {
  auth:IAuthState,
  users: IUsersState
}

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer:  persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
 });