import { configureStore } from "@reduxjs/toolkit";
import swticherReducer from "./apiSwitcher/swticherSlice";
import chatReducer from "./chat/chatSlice";
import panelsReducer from "./panels/panelsSlice";

export const store = configureStore({
  reducer: {
    switcher: swticherReducer,
    chat: chatReducer,
    panels: panelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
