import { ChatBubble } from "./ChatBubble";

export function ChatWindow({ messages }) {
  return (
    <div className="flex flex-col gap-3 p-4 h-[400px] overflow-y-auto bg-[var(--pathfinder-white)] border border-[var(--pathfinder-green)] rounded-lg shadow-inner">
      {messages.map((msg, index) => (
  <ChatBubble
    key={index}
    text={msg.text}
    isUser={msg.isUser}
    timestamp={msg.timestamp}
  />
))}

    </div>
  );
}
