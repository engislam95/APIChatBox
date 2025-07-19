import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { parsedCommand$ } from "../rxjs/chatParser";

export const useParsedCommandListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sub = parsedCommand$.subscribe(({ api, action, query, raw }) => {
      if (
        !["get", "search"].includes(action) ||
        !api ||
        typeof api !== "string"
      )
        return;

      console.log({ api, action, query, raw });
    });

    return () => sub.unsubscribe();
  }, [dispatch]);
};
