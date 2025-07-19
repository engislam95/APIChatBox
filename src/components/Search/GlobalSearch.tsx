import { useState, type SetStateAction } from "react";

const GlobalSearch = () => {
  const [serachValue, setSearchValue] = useState<string>("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchValue(e.target.value);
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
