import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage, ChatState } from "./types";

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    resetChat: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
