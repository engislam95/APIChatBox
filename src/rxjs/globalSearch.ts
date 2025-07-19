import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export const globalSearchSubject = new Subject<string>();

export const debouncedGlobalSearch$ = globalSearchSubject.pipe(
  debounceTime(300)
);
