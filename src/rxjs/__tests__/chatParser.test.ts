import { describe, it, expect, beforeEach } from "vitest";
import { Subject, take, debounceTime, filter, map } from "rxjs";
import type { ParsedCommand } from "../chatParser";

function createParsedCommand$(input$: Subject<string>) {
  return input$.pipe(
    debounceTime(0), // no delay during tests
    map((input) => input.trim().toLowerCase()),
    filter((input) => input.length > 0),
    map((raw) => {
      const tokens = raw.split(" ");
      const action = tokens[0] as ParsedCommand["action"];
      const api = tokens[1] || "";
      const query = tokens.slice(2).join(" ");

      return {
        raw,
        action,
        api,
        query,
      } satisfies ParsedCommand;
    })
  );
}

describe("parsedCommand$", () => {
  let input$: Subject<string>;

  beforeEach(() => {
    input$ = new Subject<string>();
  });

  it("parses 'get cat fact' correctly", async () => {
    const parsedCommand$ = createParsedCommand$(input$);

    const result = await new Promise<ParsedCommand>((resolve, reject) => {
      parsedCommand$.pipe(take(1)).subscribe({
        next: resolve,
        error: reject,
      });
      input$.next("get cat fact");
    });

    const expected = {
      raw: "get cat fact",
      action: "get",
      api: "cat",
      query: "fact",
    };

    expect(result).toEqual(expected);
  });

  it("parse 'get weather berlin' correctly", async () => {
    const parsedCommand$ = createParsedCommand$(input$);

    const result = await new Promise<ParsedCommand>((resolve, reject) => {
      parsedCommand$.pipe(take(1)).subscribe({
        next: resolve,
        error: reject,
      });
      input$.next("get weather berlin");
    });

    const expected = {
      raw: "get weather berlin",
      action: "get",
      api: "weather",
      query: "berlin",
    };

    expect(result).toEqual(expected);
  });
});
