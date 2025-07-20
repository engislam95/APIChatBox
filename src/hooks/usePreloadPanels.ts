import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import type { ParsedCommand } from "../rxjs/chatParser";
import { generateRandomId } from "../utils/generateRandomId";
import { addMessage } from "../store/chat/chatSlice";
import { addPanel } from "../store/panels/panelsSlice";
import { fetchPanelData } from "../store/panels/action";
import type { ApiKey } from "../store/apiSwitcher/types";

export const usePreloadPanels = () => {
  const dispatch = useAppDispatch();
  const panels = useAppSelector((state: RootState) => state.panels.panels);
  const hasPreloaded = useRef(false);

  useEffect(() => {
    if (hasPreloaded.current) return;
    hasPreloaded.current = true;

    const preloadCommands: ParsedCommand[] = [
      {
        api: "weather",
        action: "get",
        query: "berlin",
        raw: "get weather berlin",
      },
      { api: "cat", action: "get", query: "fact", raw: "get cat fact" },
    ];

    preloadCommands.forEach(({ api, query, raw }) => {
      const exists = panels.find((p) => p.api === api && p.input === query);
      if (exists) return;

      const id = generateRandomId();
      dispatch(addMessage({ id, role: "user", content: raw }));
      dispatch(addPanel({ id, api: api as ApiKey, input: query || "" }));
      dispatch(fetchPanelData({ id, api: api as ApiKey, input: query || "" }));
    });
  }, [dispatch, panels]);
};
