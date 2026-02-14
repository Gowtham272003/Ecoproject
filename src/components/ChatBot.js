import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Welcome! How may I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8082/api/chat",
        { message: userMsg.text }
      );

      const botMsg = {
        from: "bot",
        text: res.data.reply
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ AI server not responding" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div style={botIcon} onClick={() => setOpen(!open)}>
        🤖
      </div>

      {open && (
        <div style={chatBox}>
          <div style={header}>EcoBazaar Assistant</div>

          <div style={chatBody}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.from === "user" ? userMsgStyle : botMsgStyle}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={botMsgStyle}>Typing...</div>}
          </div>

          <div style={inputBox}>
            <input
              style={inputStyle}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EcoBazaar..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={sendBtn} onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

/* ================= STYLES ================= */

const botIcon = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#1976d2",
  color: "#fff",
  borderRadius: "50%",
  padding: "14px",
  cursor: "pointer",
  fontSize: "24px",
  zIndex: 1000
};

const chatBox = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000
};

const header = {
  background: "#1976d2",
  color: "#fff",
  padding: "10px",
  fontWeight: "bold",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px"
};

const chatBody = {
  padding: "10px",
  height: "220px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column"
};

const userMsgStyle = {
  alignSelf: "flex-end",
  background: "#e3f2fd",
  padding: "6px",
  borderRadius: "6px",
  marginBottom: "6px",
  textAlign: "right"
};

const botMsgStyle = {
  alignSelf: "flex-start",
  background: "#f1f1f1",
  padding: "6px",
  borderRadius: "6px",
  marginBottom: "6px"
};

const inputBox = {
  display: "flex",
  borderTop: "1px solid #ddd"
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  border: "none",
  outline: "none"
};

const sendBtn = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer"
};

export default ChatBot;