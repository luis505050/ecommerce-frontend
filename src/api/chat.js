export const sendMessageToChat = async (text) => {
  try {
    const res = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    return data.reply; // la respuesta del backend
  } catch (error) {
    console.error("Error en el chat:", error);
    return "Error al conectar con el servidor.";
  }
};
