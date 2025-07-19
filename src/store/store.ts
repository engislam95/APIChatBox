import { configureStore } from "@reduxjs/toolkit";
import swticherReducer from "./apiSwitcher/swticherSlice";

export const store = configureStore({
  reducer: {
    switcher: swticherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
