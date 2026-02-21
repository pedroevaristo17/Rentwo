import { useContext, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../store/AppProvider";

export default function ChatRoom() {
  const { state, dispatch } = useContext(AppContext);
  const { id: chatId } = useParams();
  const [text, setText] = useState("");

  const chat = state.chats?.[chatId];

  const otherId = useMemo(() => {
    if (!chat) return null;
    return chat.participants.find((p) => p !== "me") || null;
  }, [chat]);

  const otherRoommate = useMemo(() => {
    if (!otherId) return null;
    return (state.roommates || []).find((r) => r.id === otherId) || null;
  }, [state.roommates, otherId]);

  if (!chat) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Chat</h1>
        <p>Conversa não encontrada.</p>
        <Link to="/likes">Voltar</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Chat</h1>
      <p style={{ opacity: 0.7 }}>
        Com: <strong>{otherRoommate ? otherRoommate.name : otherId}</strong>
      </p>

      <div style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 12, padding: 12, minHeight: 220 }}>
        {chat.messages.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Nenhuma mensagem ainda.</p>
        ) : (
          chat.messages.map((m) => (
            <div key={m.id} style={{ marginBottom: 10 }}>
              <strong>{m.senderId === "me" ? "Você" : "Outro"}:</strong>{" "}
              {m.text}
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = text.trim();
          if (!trimmed) return;

          dispatch({ type: "CHAT_SEND_MESSAGE", payload: { chatId, text: trimmed } });
          setText("");
        }}
        style={{ marginTop: 12, display: "flex", gap: 8 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite uma mensagem..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" style={{ padding: "10px 14px" }}>
          Enviar
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <Link to="/likes">Voltar para Curtidas</Link>
      </div>
    </div>
  );
}