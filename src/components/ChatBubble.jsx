export function ChatBubble({ text, isUser, timestamp }) {
  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
      <p>{text}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
}
