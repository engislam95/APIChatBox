import { debounceTime, filter, map } from "rxjs";
import { chatInputSubject } from "../components/Chat/components/ChatInput";

export type ParsedCommand = {
  raw: string;
  api: string;
  action: "get" | "search" | "reset";
  query?: string;
};

export const parsedCommand$ = chatInputSubject.pipe(
  debounceTime(200),
  map((input) => input.trim().toLowerCase()),
  filter((input) => input.length > 0),
  map((raw) => {
    const tokens = raw.split(" ");
    const action = tokens[0] as ParsedCommand["action"]; // get or search
    const api = tokens[1] || "reset"; // serach api ex: cat
    const query = tokens.slice(2).join(" "); //  rest of the sentence

    return {
      raw,
      action,
      api,
      query,
    } satisfies ParsedCommand;
  })
);
