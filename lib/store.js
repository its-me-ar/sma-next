import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      post: postReducer,
    },
  });
};
