
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
 
const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer:  persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
 });