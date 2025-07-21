import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { Panel } from "../../../store/panels/types";
import { describe, expect, it } from "vitest";
import CatPanel from "../components/CatPanel";
import panelsReducer from "../../../store/panels/panelsSlice";
import { globalSearchSubject } from "../../../rxjs/globalSearch";

describe("Result Rendering", () => {
  const renderWithStore = (initialPanels: Panel[] = []) => {
    const store = configureStore({
      reducer: { panels: panelsReducer },
      preloadedState: {
        panels: { panels: initialPanels },
      },
    });

    render(
      <Provider store={store}>
        <CatPanel />
      </Provider>
    );
  };

  it("renders cat fact content when data is available with search", async () => {
    const mockPanels: Panel[] = [
      {
        id: "1",
        api: "cat",
        input: "",
        data: { fact: "Cats are great pets" },
        loading: false,
        error: undefined,
      },
    ];

    renderWithStore(mockPanels);

    expect(screen.getByText(/Cats are great pets/i)).toBeInTheDocument();

    // Trigger global search
    globalSearchSubject.next("cat");

    await waitFor(() => {
      expect(screen.getByText(/are great pets/i)).toBeInTheDocument();
      const marks = screen.getAllByText(/Cat/i);
      const mark = marks.find((el) => el.tagName === "MARK");
      expect(mark).toBeDefined();
    });
  });

  it("renders error message when error exists", () => {
    const mockPanels: Panel[] = [
      {
        id: "1",
        api: "cat",
        input: "",
        data: null,
        loading: false,
        error: "Failed to fetch cat fact",
      },
    ];

    renderWithStore(mockPanels);

    expect(screen.getByText(/Failed to fetch cat fact/i)).toBeInTheDocument();
  });
});
