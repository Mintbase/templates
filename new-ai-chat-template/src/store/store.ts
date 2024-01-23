import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    chatReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
