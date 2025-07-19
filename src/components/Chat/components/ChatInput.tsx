import { useState } from "react";
import { Subject } from "rxjs";

export const chatInputSubject = new Subject<string>();

const ChatInput = () => {
  const [seachValue, setSearchValue] = useState<string>("");

  const handleSerach = () => {
    const trimmedValue = seachValue.trim();
    if (trimmedValue) {
      chatInputSubject.next(trimmedValue);
      setSearchValue("");
    }
  };

  const handleReset = () => {
    console.log("reseted");
  };

  return (
    <form className="flex flex-col sm:flex-row sm:items-center gap-2 w-full p-2 border-t border-gray-200 dark:border-gray-700 ">
      <input
        value={seachValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Type a command (e.g. get cat fact)..."
        className="bg-[#3B3864] text-sm px-4 py-2 rounded-lg w-64 focus:outline-none placeholder-gray-400"
      />

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleSerach}
          className="px-4 py-2 rounded-md bg-blue-400 text-white hover:bg-blue-700 text-sm transition cursor-pointer"
        >
          Send
        </button>

        <button
          type="button"
          onClick={handleReset}
          title="Reset Chat"
          className="px-3 py-2 rounded-md  bg-secondary  text-white hover:bg-pink-700 text-sm transition cursor-pointer"
        >
          🗑️
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
