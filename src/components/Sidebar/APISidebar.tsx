import { useState } from "react";
import { apiList } from "./helper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { switchApi } from "../../store/apiSwitcher/swticherSlice";
import { RxHamburgerMenu } from "react-icons/rx";

const APISidebar = () => {
  const dispatch = useAppDispatch();
  const activeApis = useAppSelector((state) => state.switcher.activeApis);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile*/}
      {!isOpen && (
        <button
          className="md:hidden fixed top-1 left-4 p-10 z-50 bg-[#4C3C7C] text-white px-4 py-2 rounded-xl shadow-lg font-medium mb-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RxHamburgerMenu />
        </button>
      )}

      <aside
        className={`fixed md:relative z-40 md:pt-0 top-0 left-0 h-full md:h-auto w-64 md:w-60 bg-gray-800 md:bg-transparent text-white shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } rounded-r-2xl md:rounded-2xl overflow-y-auto p-4 md:pl-0`}
      >
        <h3 className="text-xl font-semibold mb-6 md:hidden">Available APIs</h3>

        <div className="space-y-3">
          {apiList.map((api) => {
            const isActive = activeApis[api.key];
            return (
              <div
                key={api.key}
                className={`flex items-center justify-between px-4 py-3 rounded-xl  transition-all duration-200 ${
                  isActive
                    ? "bg-primary  border border-primary"
                    : "bg-gray-800 hover:bg-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{api.label}</span>
                </div>

                <button
                  onClick={() => dispatch(switchApi(api.key))}
                  aria-label={`Switch ${api.label}`}
                  className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
                    isActive ? "bg-secondary" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      isActive ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default APISidebar;
