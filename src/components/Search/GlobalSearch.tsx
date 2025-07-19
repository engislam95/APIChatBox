import { useState } from "react";
import { globalSearchSubject } from "../../rxjs/globalSearch";

const GlobalSearch = () => {
  const [serachValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    globalSearchSubject.next(e.target.value);
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={serachValue}
        placeholder="Global Search..."
        onChange={handleChange}
        className="bg-[#3B3864] text-sm pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none placeholder-gray-400"
      />
    </div>
  );
};

export default GlobalSearch;
