// src/pages/Likes.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/AppProvider";

export default function Likes() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const likedIds = state.likesRoommates || [];
  const roommates = state.roommates || [];

  const likedRoommates = roommates.filter((r) => likedIds.includes(r.id));

  return (
    <div style={{ padding: 16 }}>
      <h1>Curtidas</h1>

      {likedRoommates.length === 0 ? (
        <p>Nenhuma curtida ainda.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {likedRoommates.map((r) => (
            <li
              key={r.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <strong>
                {r.name} • {r.age}
              </strong>

              <div style={{ marginTop: 6, opacity: 0.8 }}>{r.bio}</div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  onClick={() =>
                    dispatch({
                      type: "LIKE_REMOVE",
                      payload: { roommateId: r.id },
                    })
                  }
                  style={{ padding: "8px 12px" }}
                >
                  Remover
                </button>

                <button
                  onClick={() => {
                    // 1) cria o chat no state (se ainda não existir)
                    dispatch({ type: "CHAT_OPEN", payload: { otherId: r.id } });

                    // 2) gera o mesmo chatId usado no reducer
                    const chatId = ["me", r.id].sort().join("_");

                    // 3) navega para a sala
                    navigate(`/chat/${chatId}`);
                  }}
                  style={{ padding: "8px 12px" }}
                >
                  Abrir chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}