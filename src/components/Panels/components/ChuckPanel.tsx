import { useEffect, useState } from "react";
import { GiPunchBlast } from "react-icons/gi";
import { RiDragMove2Fill } from "react-icons/ri";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useAppSelector } from "../../../store/hooks";
import { createSelectPanelsByApi } from "../../../store/panels/panelsSelectors";
import { debouncedGlobalSearch$ } from "../../../rxjs/globalSearch";
import { highlightMatches } from "../../../utils/highlightMatches";

const selectChuckPanels = createSelectPanelsByApi("chuck");

const ChuckPanel = () => {
  const chuckPanels = useAppSelector(selectChuckPanels);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sub = debouncedGlobalSearch$.subscribe((term) => {
      setSearchTerm(term.toLowerCase());
    });
    return () => sub.unsubscribe();
  }, []);

  const filterChuckPanel = (panel: any) => {
    if (!searchTerm) return true;
    const joke = panel?.data?.value || "";
    return joke.toLowerCase().includes(searchTerm);
  };

  const filteredPanels = chuckPanels.filter(filterChuckPanel);

  if (filteredPanels.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-3 mb-10 border-l-2 p-5 border-gray-500 rounded-xl shadow-sm shadow-gray-500">
      <header className="flex justify-between items-center gap-3 mb-2">
        <div className="flex gap-3 items-center">
          <GiPunchBlast className="text-2xl text-yellow-500" />
          <span className="text-md text-gray-700 font-bold dark:text-gray-200">
            Chuck Norris Panel
          </span>
        </div>
        <RiDragMove2Fill className="cursor-move text-pink-400 text-xl" />
      </header>

      <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-2">
        {filteredPanels.map((panel, index) => {
          if (panel.loading) {
            return (
              <div key={index} className="animate-pulse mb-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            );
          }

          if (panel.error) {
            return (
              <p key={index} className="text-sm text-red-600 dark:text-red-400">
                Error: {panel.error}
              </p>
            );
          }

          const data = panel.data;
          if (!data) {
            return (
              <p
                key={index}
                className="text-sm text-gray-400 dark:text-gray-500"
              >
                No data received from API.
              </p>
            );
          }

          return (
            <div
              key={data.id}
              className="bg-[#4C3C7C] border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-4 flex items-center gap-3 text-white relative"
            >
              <img
                src={data.icon_url}
                alt="Chuck Norris Icon"
                className="w-12 h-12 rounded-full self-start"
              />

              <div className="text-sm leading-relaxed">
                {highlightMatches(data.value, searchTerm)}
              </div>

              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-300 hover:underline  items-center gap-1"
              >
                <HiOutlineExternalLink className="text-secondary text-xl" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChuckPanel;
