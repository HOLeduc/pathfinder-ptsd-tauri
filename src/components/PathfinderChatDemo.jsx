import React, { useState } from "react";
import Logo from "../assets/PathfinderLogoGoldTransparent.png";
import Button from "./ui/button";

const questions = [
  "How do I manage panic attacks?",
  "What can I do when I feel triggered?",
  "How do I talk to my partner about PTSD?"
];

const team = [
  "Therapist",
  "Peer Support",
  "Case Manager",
  "Mindfulness Coach",
  "Trauma Nurse",
  "Military Veteran Peer",
  "First Responder Peer"
];

const roleResponses = {
  Therapist: {
    "How do I manage panic attacks?": "Focus on slow, deep breathing. Try grounding with senses.",
    "What can I do when I feel triggered?": "Use grounding exercises. Describe your surroundings in detail.",
    "How do I talk to my partner about PTSD?": "Be honest about your experience and needs.",
    default: "Let's explore this from a therapeutic perspective."
  },
  "Peer Support": {
    "How do I manage panic attacks?": "You're not alone. Call a peer if you can and slow your breathing.",
    "What can I do when I feel triggered?": "Take a break. Remember it's a memory, not the present.",
    "How do I talk to my partner about PTSD?": "Write down your thoughts first. Share gently.",
    default: "I'm here as a peer who's been there."
  },
  "Case Manager": {
    "How do I manage panic attacks?": "Consider a crisis plan with your team. Use local resources.",
    "What can I do when I feel triggered?": "Step back and reach out for support.",
    "How do I talk to my partner about PTSD?": "We can find family education resources together.",
    default: "Let's look at supports and services."
  },
  "Mindfulness Coach": {
    "How do I manage panic attacks?": "Notice your breath without judging. Let thoughts come and go.",
    "What can I do when I feel triggered?": "Bring awareness to physical sensations and your surroundings.",
    "How do I talk to my partner about PTSD?": "Center yourself before talking. Speak with kindness.",
    default: "Let's stay present with this together."
  },
  "Trauma Nurse": {
    "How do I manage panic attacks?": "Slow exhales help regulate your system. Monitor for safety.",
    "What can I do when I feel triggered?": "Ground with sensory input. Check your vitals if needed.",
    "How do I talk to my partner about PTSD?": "Explain it's a real medical condition needing understanding.",
    default: "I'm here with a trauma-informed approach."
  },
  "Military Veteran Peer": {
    "How do I manage panic attacks?": "Use tactical breathing like in training. Find a safe spot.",
    "What can I do when I feel triggered?": "Remind yourself you're safe now. Check your environment.",
    "How do I talk to my partner about PTSD?": "Be real about what you went through. Ask for their patience.",
    default: "I'm a veteran too. You're not alone."
  },
  "First Responder Peer": {
    "How do I manage panic attacks?": "Step aside on scene if needed. Breathe, talk to a peer.",
    "What can I do when I feel triggered?": "Identify work triggers and reset before continuing.",
    "How do I talk to my partner about PTSD?": "Explain how the job affects you and what you need.",
    default: "Let's talk peer-to-peer."
  }
};

export default function PathfinderChatDemo() {
  const [messages, setMessages] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (newMessage) => {
    if (!newMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { text: newMessage, isUser: true, timestamp }
    ]);

    setTimeout(() => {
      if (selectedTeam) {
        const reply = roleResponses[selectedTeam].default;
        setMessages((prev) => [
          ...prev,
          { text: `${selectedTeam}: ${reply}`, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Pathfinder Coach: Let's talk about that.", isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }
    }, 600);
  };

  const handleSelectQuestion = (question) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { text: question, isUser: true, timestamp }
    ]);

    setTimeout(() => {
      if (selectedTeam) {
        const reply = roleResponses[selectedTeam][question] || roleResponses[selectedTeam].default;
        setMessages((prev) => [
          ...prev,
          { text: `${selectedTeam}: ${reply}`, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: `Pathfinder Coach: ${getDefaultCoachAnswer(question)}`, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }
    }, 600);
  };

  const getDefaultCoachAnswer = (question) => {
    if (question === "How do I manage panic attacks?") {
      return "Try deep breathing and grounding exercises.";
    } else if (question === "What can I do when I feel triggered?") {
      return "Pause, breathe, and ground yourself with your senses.";
    } else if (question === "How do I talk to my partner about PTSD?") {
      return "Choose a calm moment and explain your needs gently.";
    } else {
      return "Thank you for your question.";
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleCopyChat = () => {
    if (messages.length === 0) {
      alert("No messages to copy!");
      return;
    }
    const formatted = messages.map(
      (m) => `[${m.timestamp}] ${m.isUser ? "User" : "Assistant"}: ${m.text}`
    ).join("\n");

    navigator.clipboard.writeText(formatted)
      .then(() => alert("Conversation copied to clipboard!"))
      .catch(() => alert("Failed to copy conversation."));
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src={Logo} alt="Pathfinder Self Mastery Logo" className="logo" />
        <h1 className="app-title">Pathfinder PTSD Coach</h1>
      </div>

      <div>
        <h2>Talk to a:</h2>
        <div className="button-grid">
          {team.map((role, index) => (
            <Button
              key={index}
              onClick={() => setSelectedTeam(role)}
              className={selectedTeam === role ? "selected" : ""}
            >
              {role}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2>Select a question:</h2>
        <div className="button-grid">
          {questions.map((q, index) => (
            <Button key={index} onClick={() => handleSelectQuestion(q)}>
              {q}
            </Button>
          ))}
        </div>
      </div>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.isUser ? "user" : "assistant"}`}>
            <div className="text">{msg.text}</div>
            <div className="timestamp">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={() => {
            handleSend(inputValue);
            setInputValue("");
          }}
        >
          Send
        </button>
      </div>

      <div className="control-buttons">
        <Button onClick={handleClearChat}>Clear Chat</Button>
        <Button onClick={handleCopyChat}>Copy Chat</Button>
      </div>
    </div>
  );
}
