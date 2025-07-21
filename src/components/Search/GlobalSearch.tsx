import { useState } from "react";
import { globalSearchSubject } from "../../rxjs/globalSearch";
import { FiSearch } from "react-icons/fi";

const GlobalSearch = () => {
  const [serachValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    globalSearchSubject.next(e.target.value);
  };

  return (
    <div className="mb-4 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <FiSearch className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={serachValue}
        data-testid="global-filter"
        placeholder="Global Search..."
        onChange={handleChange}
        className="bg-[#3B3864] text-sm pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none placeholder-gray-400"
      />
    </div>
  );
};

export default GlobalSearch;
