// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./slices/playersSlice";

const store = configureStore({
  reducer: {
    players: playersReducer,
  },
});

export default store;
