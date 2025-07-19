import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiKey } from "../apiSwitcher/types";
import { fetchApiResponse } from "./client";

export const fetchPanelData = createAsyncThunk(
  "panels/fetchPanelData",
  async ({ id, api, input }: { id: string; api: ApiKey; input: string }) => {
    const data = await fetchApiResponse(api, input);
    return { id, data };
  }
);
