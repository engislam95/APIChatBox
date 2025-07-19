import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import swticherReducer from "../../store/apiSwitcher/swticherSlice";
import APISidebar from "./APISidebar";

const renderWithStore = (customState = {}) => {
  const store = configureStore({
    reducer: {
      switcher: swticherReducer,
    },
    preloadedState: {
      switcher: {
        activeApis: {
          cat: true,
          chuck: false,
          github: false,
          weather: true,
          ...customState,
        },
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <APISidebar />
      </Provider>
    ),
  };
};

describe("APISidebar", () => {
  it("renders API switcher", () => {
    renderWithStore();

    expect(screen.getByText(/Weather/i)).toBeInTheDocument();
    expect(screen.getByText(/Cat Facts/i)).toBeInTheDocument();
  });

  it("switch an API when clicked", () => {
    const { store } = renderWithStore();
    // Grab the switch button using aria-label
    const catToggle = screen.getByLabelText("Switch Cat Facts");

    expect(store.getState().switcher.activeApis.cat).toBe(true);

    fireEvent.click(catToggle);

    expect(store.getState().switcher.activeApis.cat).toBe(false);
  });
});
