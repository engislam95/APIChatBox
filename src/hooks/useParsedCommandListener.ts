import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { parsedCommand$ } from "../rxjs/chatParser";
import { generateRandomId } from "../utils/generateRandomId";
import { addMessage, resetChat } from "../store/chat/chatSlice";
import { addPanel, clearPanels } from "../store/panels/panelsSlice";
import { fetchPanelData } from "../store/panels/action";
import type { ApiKey } from "../store/apiSwitcher/types";

export const useParsedCommandListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sub = parsedCommand$.subscribe(({ api, action, query, raw }) => {
      if (
        !["get", "search", "reset"].includes(action) ||
        !api ||
        typeof api !== "string"
      ) {
        return;
      } else if (action == "reset") {
        dispatch(resetChat());
        dispatch(clearPanels());
      } else {
        const id = generateRandomId();
        dispatch(addMessage({ id, role: "user", content: raw }));
        dispatch(addPanel({ id, api: api as ApiKey, input: query }));
        dispatch(fetchPanelData({ id, api: api as ApiKey, input: query }));
      }
    });

    return () => sub.unsubscribe();
  }, [dispatch]);
};
