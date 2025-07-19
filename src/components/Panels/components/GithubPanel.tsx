import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiDragMove2Fill } from "react-icons/ri";
import { createSelectPanelsByApi } from "../../../store/panels/panelsSelectors";
import { useAppSelector } from "../../../store/hooks";
import { debouncedGlobalSearch$ } from "../../../rxjs/globalSearch";
import { highlightMatches } from "../../../utils/highlightMatches";
import { HiOutlineExternalLink } from "react-icons/hi";

const selectGitHubPanels = createSelectPanelsByApi("github");

const GitHubPanel = () => {
  const githubPanels = useAppSelector(selectGitHubPanels);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sub = debouncedGlobalSearch$.subscribe((term) => {
      setSearchTerm(term.toLowerCase());
    });

    return () => sub.unsubscribe();
  }, []);

  const filterGitHubPanel = (panel: any) => {
    if (!searchTerm) return true;
    const items = panel?.data?.items || [];
    return items.some((user: any) =>
      user.login.toLowerCase().includes(searchTerm)
    );
  };

  const filteredPanels = githubPanels.filter(filterGitHubPanel);

  if (filteredPanels.length === 0) return null;

  return (
    <section className="w-full flex flex-col gap-3 mb-10 border-l-2 p-5 border-gray-500 rounded-xl shadow-sm shadow-gray-500">
      <header className="flex justify-between items-center gap-3 mb-2">
        <div className="flex gap-3 items-center">
          <FaGithub className="text-2xl text-gray-700 dark:text-white" />
          <span className="text-md text-gray-700 font-bold dark:text-gray-200">
            GitHub Users Panel
          </span>
        </div>
        <RiDragMove2Fill className="cursor-move text-pink-400 text-xl" />
      </header>

      <div className="flex flex-wrap gap-4 max-h-96 overflow-y-auto">
        {githubPanels.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No panel for GitHub API yet.
          </p>
        ) : (
          githubPanels.filter(filterGitHubPanel).map((panel, index) => {
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
                <p
                  key={index}
                  className="text-sm text-red-600 dark:text-red-400"
                >
                  Error: {panel.error}
                </p>
              );
            }

            const users = panel?.data?.items || [];

            return users
              .filter((user: any) =>
                user.login.toLowerCase().includes(searchTerm)
              )
              .map((user: any) => (
                <div
                  key={user.id}
                  className="bg-[#4C3C7C] border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-4 w-[250px] flex items-center gap-4"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white flex items-center gap-1 hover:underline"
                    >
                      {highlightMatches(user.login, searchTerm)}
                      <HiOutlineExternalLink className="text-secondary text-xl" />
                    </a>
                    <span className="text-xs text-gray-300">ID: {user.id}</span>
                  </div>
                </div>
              ));
          })
        )}
      </div>
    </section>
  );
};

export default GitHubPanel;
