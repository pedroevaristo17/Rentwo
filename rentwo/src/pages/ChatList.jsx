import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/AppProvider";

export default function ChatList() {
  const { state } = useContext(AppContext);

  const chatsArray = useMemo(() => {
    const chatsObj = state.chats || {};
    return Object.values(chatsObj).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [state.chats]);

  function getOtherParticipantId(chat) {
    return chat.participants?.find((p) => p !== "me") || null;
  }

  function getRoommateNameById(id) {
    if (!id) return "Desconhecido";
    const r = (state.roommates || []).find((x) => x.id === id);
    return r ? r.name : id;
  }

  function getLastMessage(chat) {
    const msgs = chat.messages || [];
    if (msgs.length === 0) return "Sem mensagens ainda";
    const last = msgs[msgs.length - 1];
    return last.senderId === "me" ? `Você: ${last.text}` : last.text;
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Chats</h1>

      {chatsArray.length === 0 ? (
        <p>Nenhuma conversa ainda. Abra um chat pelas Curtidas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {chatsArray.map((chat) => {
            const otherId = getOtherParticipantId(chat);
            const name = getRoommateNameById(otherId);
            const last = getLastMessage(chat);

            return (
              <li
                key={chat.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 10,
                }}
              >
                <strong>{name}</strong>
                <div style={{ marginTop: 6, opacity: 0.8 }}>{last}</div>

                <div style={{ marginTop: 10 }}>
                  <Link to={`/chat/${chat.id}`}>Abrir conversa</Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}