import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hola 👋, soy tu asistente. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const newMsgs = [...messages, { sender: "user", text: input }];
    setMessages(newMsgs);

    // Enviar al backend (AJUSTA la URL cuando tengas tu backend)
    const res = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    // Agregar respuesta del bot
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tienda E-Commerce 🛒</h1>

      {/* CHAT */}
      <div style={styles.chatBox}>
        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background: msg.sender === "user" ? "#4a90e2" : "#999"
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div style={styles.inputBox}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            style={styles.input}
          />
          <button onClick={handleSend} style={styles.button}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center"
  },
  chatBox: {
    width: "100%",
    maxWidth: 500,
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    height: 500
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  message: {
    padding: "10px 15px",
    borderRadius: 10,
    color: "white",
    maxWidth: "80%"
  },
  inputBox: {
    display: "flex",
    gap: 10
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #aaa"
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 6,
    background: "#4a90e2",
    color: "white",
    cursor: "pointer"
  }
};
