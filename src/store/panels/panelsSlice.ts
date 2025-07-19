import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PanelsState } from "./types";
import type { ApiKey } from "../apiSwitcher/types";
import { fetchPanelData } from "./action";

const initialState: PanelsState = {
  panels: [],
};

const panelsSlice = createSlice({
  name: "panels",
  initialState,
  reducers: {
    addPanel: (
      state,
      action: PayloadAction<{ id: string; api: ApiKey; input: string }>
    ) => {
      state.panels.push({
        id: action.payload.id,
        api: action.payload.api,
        input: action.payload.input,
        data: null,
        loading: true,
      });
    },
    clearPanels: (state) => {
      state.panels = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPanelData.pending, (state, action) => {
      const panel = state.panels.find((p) => p.id === action.meta.arg.id);
      if (panel) panel.loading = true;
    });

    builder.addCase(fetchPanelData.fulfilled, (state, action) => {
      const panel = state.panels.find((p) => p.id === action.payload.id);
      if (panel) {
        panel.data = action.payload.data;
        panel.loading = false;
        panel.error = undefined;
      }
    });

    builder.addCase(fetchPanelData.rejected, (state, action) => {
      const panel = state.panels.find((p) => p.id === action.meta.arg.id);
      if (panel) {
        panel.loading = false;
        panel.error = action.error.message || "Fetch failed";
      }
    });
  },
});

export const { addPanel, clearPanels } = panelsSlice.actions;
export default panelsSlice.reducer;
