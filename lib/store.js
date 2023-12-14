import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import postReducer from "./features/postSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      post: postReducer,
    },
  });
};
