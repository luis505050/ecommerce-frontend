import { useState } from "react";
import { sendMessageToChat } from "../api/chat";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // mensaje del usuario
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // obtener respuesta del backend
    const reply = await sendMessageToChat(input);

    const botMessage = { sender: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);

    setInput(""); // limpiar input
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h2>Chat</h2>

      <div style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "300px",
        overflowY: "auto",
        background: "#f7f7f7"
      }}>
        {messages.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje..."
        style={{ width: "70%", padding: "10px" }}
      />

      <button onClick={handleSend} style={{ padding: "10px 15px" }}>
        Enviar
      </button>
    </div>
  );
}
