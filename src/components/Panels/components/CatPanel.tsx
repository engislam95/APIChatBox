import { useAppSelector } from "../../../store/hooks";
import { createSelectPanelsByApi } from "../../../store/panels/panelsSelectors";

const selectCatPanels = createSelectPanelsByApi("cat");

const CatPanel = () => {
  const catPanels = useAppSelector(selectCatPanels);

  if (catPanels.length === 0) {
    return null;
  }

  return (
    <section className="w-full flex flex-col gap-3 mb-10 border-l-2 p-2 border-gray-500 rounded-xl shadow-sm shadow-gray-500">
      <header className="flex justify-between items-center gap-3 mb-2">
        <div className="flex gap-3">
          <span className="text-md text-gray-600 font-bold dark:text-gray-300">
            Cat Facts Panel
          </span>
        </div>
      </header>

      <div className="flex flex-col max-h-60 overflow-y-auto">
        {catPanels.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No panel for Cat API yet.
          </p>
        ) : (
          catPanels.map((catPanel, index) => {
            if (catPanel.loading) {
              return (
                <div key={index} className="animate-pulse mb-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              );
            }

            if (catPanel.error) {
              return (
                <p
                  key={index}
                  className="text-sm text-red-600 dark:text-red-400"
                >
                  Error: {catPanel.error}
                </p>
              );
            }

            if (!catPanel.data) {
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
                key={index}
                className="cat-response bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 shadow-lg rounded-2xl p-6 transition-transform transform mb-2 duration-200"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  🐱
                  <span className="font-medium">{catPanel.data.fact}</span>
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default CatPanel;
