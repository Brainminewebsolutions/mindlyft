"use client";

import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react";

type Sender = "bot" | "user";

type Message = {
  id: number;
  text: string;
  sender: Sender;
  timestamp: Date;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] =
    useState<string>("");

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: Record<string, string> = {
    hello:
      "Hi there! Welcome to Mindlyft AI. How can I assist you?",

    services:
      "We offer AI-powered solutions, consulting, and custom development. What specifically interests you?",

    pricing:
      "For pricing information, please contact our sales team at sales@mindlyftai.com",

    team:
      "Our team consists of experienced AI experts and developers. Visit our team section to learn more!",

    project:
      "Check out our portfolio section to see our latest projects and case studies.",

    contact:
      "You can reach us at contact@mindlyftai.com or use the contact form on our website.",

    about:
      "Mindlyft AI is dedicated to empowering businesses with AI solutions. Learn more in our About section!",

    default:
      "That's a great question! For more details, please visit our website or contact our team.",
  };

  const getKeyword = (text: string): string => {
    const lower = text.toLowerCase();

    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("hey")
    ) {
      return "hello";
    }

    if (
      lower.includes("service") ||
      lower.includes("what do you")
    ) {
      return "services";
    }

    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("fee")
    ) {
      return "pricing";
    }

    if (
      lower.includes("team") ||
      lower.includes("people")
    ) {
      return "team";
    }

    if (
      lower.includes("project") ||
      lower.includes("work") ||
      lower.includes("portfolio")
    ) {
      return "project";
    }

    if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("phone")
    ) {
      return "contact";
    }

    if (
      lower.includes("about") ||
      lower.includes("company") ||
      lower.includes("who are")
    ) {
      return "about";
    }

    return "default";
  };

  const handleSendMessage = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const currentInput = inputValue;

    // Add User Message
    const userMessage: Message = {
      id: Date.now(),
      text: currentInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInputValue("");

    setIsLoading(true);

    // Simulated Bot Delay
    setTimeout(() => {
      const keyword = getKeyword(currentInput);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[keyword],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`chat-toggle-btn ${
          isOpen ? "open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
      >
        {isOpen ? (
          <span className="chat-icon-close">
            ✕
          </span>
        ) : (
          <span className="chat-icon-open">
            💬
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`chatbot-container ${
          isOpen ? "open" : ""
        }`}
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <h3>Mindlyft AI Assistant</h3>

            <p className="status-online">
              ● Online
            </p>
          </div>

          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender}`}
            >
              <div className="message-content">
                {message.sender === "bot" && (
                  <span className="bot-avatar">
                    🤖
                  </span>
                )}

                <div className="message-text">
                  {message.text}
                </div>
              </div>

              <span className="message-time" suppressHydrationWarning>
                {message.timestamp.toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <span className="bot-avatar">
                  🤖
                </span>

                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          className="chatbot-input-area"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) =>
              setInputValue(e.target.value)
            }
            placeholder="Type your message..."
            className="chat-input"
            disabled={isLoading}
          />

          <button
            type="submit"
            className="send-btn"
            disabled={
              isLoading || !inputValue.trim()
            }
          >
            Send
          </button>
        </form>

        {/* Footer */}
        <div className="chatbot-footer">
          <p>
            💡 Try asking about services,
            pricing, or our team!
          </p>
        </div>
      </div>
    </>
  );
}