import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ApiKey, ApiSwitcherState } from "./types";

const initialState: ApiSwitcherState = {
  activeApis: {
    cat: true,
    chuck: false,
    github: false,
    weather: true,
  },
};

const swticherSlice = createSlice({
  name: "switcher",
  initialState,
  reducers: {
    switchApi: (state, action: PayloadAction<ApiKey>) => {
      state.activeApis[action.payload] = !state.activeApis[action.payload];
    },
  },
});

export const { switchApi } = swticherSlice.actions;
export default swticherSlice.reducer;
