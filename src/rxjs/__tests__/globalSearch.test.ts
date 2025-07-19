import { globalSearchSubject, debouncedGlobalSearch$ } from "../globalSearch";
import { describe, it, expect } from "vitest";

describe("Global Search Subject", () => {
  it("should emit debounced values after 300ms", async () => {
    const results: string[] = [];

    // Subscribe to the debounced observable
    const subscription = debouncedGlobalSearch$.subscribe((value) => {
      results.push(value);
    });

    globalSearchSubject.next("c");
    globalSearchSubject.next("ca");
    globalSearchSubject.next("cat");

    await new Promise((r) => setTimeout(r, 300));

    expect(results).toEqual(["cat"]);

    subscription.unsubscribe();
  });
});
