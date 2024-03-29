import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "../features/auth/authSlice";
import itemDeckReducer from "../features/itemDeck/itemDeckSlice";
import requestDeckReducer from "../features/requestDeck/requestDeckSlice";
import labelsReducer from "../features/labels/labelsSlice";

const reducers = combineReducers({
  auth: authReducer,
  itemDeck: itemDeckReducer,
  requestDeck: requestDeckReducer,
  labels: labelsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
