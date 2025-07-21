import { useState } from "react";
import { Button } from "./ui/button";

export function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-2 border-t border-gray-200">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow p-2 rounded-l border border-gray-300"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" className="rounded-l-none">Send</Button>
    </form>
  );
}