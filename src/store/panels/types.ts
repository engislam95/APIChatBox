import type { ApiKey } from "../apiSwitcher/types";

export type Panel = {
  id: string;
  api: ApiKey;
  input: string;
  data: any;
  loading: boolean;
  error?: string;
};

export type PanelsState = {
  panels: Panel[];
};
