import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { createSelectPanelsByApi } from "../../../store/panels/panelsSelectors";
import { debouncedGlobalSearch$ } from "../../../rxjs/globalSearch";
import { highlightMatches } from "../../../utils/highlightMatches";
import { TiWeatherStormy } from "react-icons/ti";
import { RiDragMove2Fill } from "react-icons/ri";

const selectWeatherPanels = createSelectPanelsByApi("weather");

const WeatherPanel = () => {
  const weatherPanels = useAppSelector(selectWeatherPanels);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sub = debouncedGlobalSearch$.subscribe((term) => {
      setSearchTerm(term.toLowerCase());
    });
    return () => sub.unsubscribe();
  }, []);

  const filterWeatherPanel = (panel: any) => {
    if (!searchTerm) return true;

    const weather = panel?.data?.current_weather;
    if (!weather) return false;

    const labeledFields = [
      { label: "temperature", value: weather.temperature },
      { label: "windspeed", value: weather.windspeed },
      { label: "winddirection", value: weather.winddirection },
      { label: "weathercode", value: weather.weathercode },
      { label: "day", value: weather.is_day ? "day" : "night" },
    ];

    return labeledFields.some(({ label, value }) => {
      const labelMatch = label.toLowerCase().includes(searchTerm);
      const valueMatch = value?.toString().toLowerCase().includes(searchTerm);
      return labelMatch || valueMatch;
    });
  };
  const filteredPanels = weatherPanels.filter(filterWeatherPanel);

  if (filteredPanels.length === 0) {
    return null;
  }

  return (
    <section className="w-full flex flex-col gap-3 mb-10 border-l-2 p-2 border-gray-500 rounded-xl shadow-sm shadow-gray-500">
      <header className="flex justify-between items-center gap-3 mb-2">
        <div className="flex gap-3">
          <TiWeatherStormy className="text-2xl text-blue-500 dark:text-blue-300" />
          <span className="text-md text-gray-600 font-bold dark:text-gray-300">
            Weather Facts Panel
          </span>
        </div>
        <div className="flex">
          <RiDragMove2Fill className="cursor-move text-pink-400 text-xl" />
        </div>
      </header>

      <div className="flex flex-col max-h-60 overflow-y-auto">
        {weatherPanels.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No panel for Weather API yet.
          </p>
        ) : (
          weatherPanels
            .filter(filterWeatherPanel)
            .map((weatherPanel, index) => {
              if (weatherPanel.loading) {
                return (
                  <div key={index} className="animate-pulse">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  </div>
                );
              }

              if (weatherPanel.error) {
                return (
                  <p key={index} className="text-red-600 dark:text-red-400">
                    Error: {weatherPanel.error}
                  </p>
                );
              }

              const weather = weatherPanel.data?.current_weather;
              const units = weatherPanel.data?.current_weather_units;

              if (!weather) {
                return (
                  <p key={index} className="text-gray-400 dark:text-gray-500">
                    No data received from API.
                  </p>
                );
              }

              return (
                <div
                  key={index}
                  className="weather-response bg-[#4C3C7C]   border  border-gray-700 shadow-lg rounded-2xl p-3 transition-transform transform mb-2 duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TiWeatherStormy className="text-3xl text-white" />
                      <h3 className="text-lg font-semibold text-white">
                        Current Weather
                      </h3>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(weather.time).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm text-gray-700 dark:text-gray-200">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {highlightMatches("Temperature", searchTerm)}
                      </span>
                      <span className="font-semibold text-white ">
                        {highlightMatches(
                          `${weather.temperature}${units?.temperature ?? ""}`,
                          searchTerm
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {highlightMatches("Wind Speed", searchTerm)}
                      </span>
                      <span className="font-semibold text-white">
                        {highlightMatches(
                          `${weather.windspeed}${units?.windspeed ?? ""}`,
                          searchTerm
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {highlightMatches("Wind Direction", searchTerm)}
                      </span>
                      <span className="font-semibold text-white">
                        {highlightMatches(
                          `${weather.winddirection}${
                            units?.winddirection ?? ""
                          }`,
                          searchTerm
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Day/Night</span>
                      <span className="font-semibold">
                        {highlightMatches(
                          weather.is_day ? "🌞 Day" : "🌙 Night",
                          searchTerm
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        {highlightMatches("Weather Code", searchTerm)}
                      </span>
                      <span className="font-semibold">
                        {highlightMatches(`${weather.weathercode}`, searchTerm)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
};

export default WeatherPanel;
