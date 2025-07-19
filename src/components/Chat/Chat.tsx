import ChatInput from "./components/ChatInput";
import ChatInterface from "./components/ChatInterface";

const Chat = () => {
  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <div className="bg-pink-400 font-semibold mb-2 p-4 rounded-xl rounded-b-none">
        Chat Input
      </div>
      <div className="flex-1 overflow-y-auto pr-1 mb-4">
        <ChatInterface />
      </div>
      <div className="mt-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
