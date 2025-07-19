import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const createSelectPanelsByApi = (api: string) =>
  createSelector(
    (state: RootState) => state.panels.panels,
    (panels) => panels.filter((p) => p.api === api)
  );
