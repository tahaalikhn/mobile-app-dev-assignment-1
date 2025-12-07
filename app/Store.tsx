import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./Redux/Exercise";

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
  },
});