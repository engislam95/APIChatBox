import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { ChatMessage } from "../../../store/chat/types";
import { BsChatRightDots } from "react-icons/bs";

const ChatInterface = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div className="flex flex-col px-4 py-6 overflow-y-auto h-full  text-white">
      {messages.map((msg: ChatMessage, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-[#4C3C7C] border border-[#2D2D3F] rounded-xl px-4 py-3 mb-3 max-w-[80%] shadow-sm"
        >
          <BsChatRightDots className="text-secondary mt-1" size={18} />

          <p className="text-sm leading-snug text-gray-100">{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;
