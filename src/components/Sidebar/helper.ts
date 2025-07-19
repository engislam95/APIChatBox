import type { ApiKey } from "../../store/apiSwitcher/types";

export const apiList: { key: ApiKey; label: string }[] = [
  { key: "cat", label: "Cat Facts" },
  { key: "chuck", label: "Chuck Norris" },
  { key: "github", label: "GitHub Users" },
  { key: "weather", label: "Weather" },
];
