import { useSortable } from "@dnd-kit/react/sortable";
import WeatherPanel from "./components/WeatherPanel";
import CatPanel from "./components/CatPanel";
import ChuckPanel from "./components/ChuckPanel";
import GithubPanel from "./components/GithubPanel";
import type { ApiKey } from "../../store/apiSwitcher/types";
import { useAppSelector } from "../../store/hooks";

const PANEL_COMPONENTS: Record<ApiKey, React.ComponentType> = {
  weather: WeatherPanel,
  cat: CatPanel,
  chuck: ChuckPanel,
  github: GithubPanel,
};

interface SortablePanelProps {
  id: ApiKey;
  index: number;
  children: React.ReactNode;
}

const SortablePanel = ({ id, index, children }: SortablePanelProps) => {
  const { ref, isDragging } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      className={`p-2 mb-2 transition ${isDragging ? "opacity-50" : ""}`}
    >
      {children}
    </div>
  );
};

const ActivePanels = () => {
  const activeApis = useAppSelector((state) => state.switcher.activeApis);

  const allKeys = Object.keys(PANEL_COMPONENTS) as ApiKey[];

  const activeKeys = allKeys.filter((key) => activeApis[key]);

  return (
    <>
      {activeKeys.map((key, index) => {
        const Panel = PANEL_COMPONENTS[key];
        return (
          <SortablePanel key={key} id={key} index={index}>
            <Panel />
          </SortablePanel>
        );
      })}
    </>
  );
};

export default ActivePanels;
