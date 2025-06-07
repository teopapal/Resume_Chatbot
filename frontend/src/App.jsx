import { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [prompt, set_prompt] = useState("");
  const [messages, set_messages] = useState([]);

  const send_prompt = async (question_text = null) => {
    const text_to_send = question_text || prompt;
    if (!text_to_send.trim()) return;

    const user_message = { sender: "user", text: text_to_send };
    set_messages((messages) => [...messages, user_message]);

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text_to_send }),
      });

      const data = await res.json();
      const response = { sender: "bot", text: data.response };
      set_messages((messages) => [...messages, response]);
    } catch (error) {
      set_messages((messages) => [
        ...messages,
        { sender: "bot", text: "Failed to connect to the server." },
      ]);
    }

    set_prompt("");
  };

  return (
      <div className="chat_container">
        <div className="chat">
          <div className="header">
            <h1 className="title">Resume Chatbot</h1>
          </div>

          <div className="input">
            <input
              type="text"
              value={prompt}
              onChange={(e) => set_prompt(e.target.value)}
              onKeyDown={handle_enter_key}
              placeholder="Ask me anything..."
              className="chat_input"
            />
            <button onClick={() => send_prompt()} className="send_button">
              Send
            </button>
          </div>
        </div>
      </div>
  );
}
export default App;

