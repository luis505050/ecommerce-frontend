import { useState, useEffect, useRef } from "react";
import ProductList from "../components/ProductList";

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hola, soy TecnoBot. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [input, setInput] = useState("");

  // Estado para mostrar/ocultar chat flotante
  const [openChat, setOpenChat] = useState(false);

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsgs = [...messages, { sender: "user", text: input }];
    setMessages(newMsgs);

    const res = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Tecnología y más <hr /></h1>

      {/* BOTÓN FLOTANTE */}
      <button style={styles.floatingBtn} onClick={() => setOpenChat(!openChat)}>
        💬
      </button>

      {/* CHAT FLOTANTE */}
      {openChat && (
        <div style={styles.chatFloating}>
          <div style={styles.chatHeader}>
            <span>TecnoBot</span>
            <button style={styles.closeBtn} onClick={() => setOpenChat(false)}>✖</button>
          </div>

          <div style={styles.messages} ref={messagesContainerRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#1561F0" : "#2B2B2B",
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
              onKeyDown={handleKeyPress}
              placeholder="Escribe un mensaje..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.button}>
              Enviar
            </button>
          </div>
        </div>
      )}

      <div className="contentProducts" style={{ marginTop: 40 }}>
        <ProductList />
        <hr />
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, fontFamily: "Arial" },
  title: { textAlign: "center", marginBottom: 20 },

  /* BOTÓN FLOTANTE */
  floatingBtn: {
    position: "fixed",
    bottom: 25,
    right: 25,
    width: 55,
    height: 55,
    background: "#1561F0",
    color: "white",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    fontSize: 26,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
  },

  /* VENTANA DEL CHAT */
  chatFloating: {
    position: "fixed",
    bottom: 95,
    right: 25,
    width: 350,
    height: 450,
    background: "#fff",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
    overflow: "hidden",
    border: "2px solid #1561F0",
    animation: "fadeIn .3s"
  },

  chatHeader: {
    background: "#1561F0",
    color: "#fff",
    padding: "12px 15px",
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: 18
  },

  messages: {
    flex: 1,
    padding: 10,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  message: {
    padding: "10px 14px",
    borderRadius: 12,
    color: "white",
    maxWidth: "75%",
    fontSize: 14,
    lineHeight: "20px"
  },

  inputBox: {
    display: "flex",
    padding: 10,
    borderTop: "1px solid #ddd",
    gap: 8
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc"
  },

  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 8,
    background: "#1561F0",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
