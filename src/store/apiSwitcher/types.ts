export type ApiKey = "cat" | "chuck" | "github" | "weather";

export interface ApiSwitcherState {
  activeApis: Record<ApiKey, boolean>;
}
