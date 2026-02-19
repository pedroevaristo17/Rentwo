// src/pages/Swipe.jsx
import { useContext } from "react";
import { AppContext } from "../store/AppProvider";

export default function Swipe() {
  const { state, dispatch } = useContext(AppContext);

  const current = state.roommates?.[state.swipeIndex];

  if (!current) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Swipe</h1>
        <p>Acabou por enquanto 🙂</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Swipe</h1>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, marginTop: 12 }}>
        <h2 style={{ margin: 0 }}>{current.name} • {current.age}</h2>
        <p style={{ marginTop: 8 }}>{current.bio}</p>
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          {current.city ? `📍 ${current.city}` : null}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button
          onClick={() => dispatch({ type: "SWIPE_NOPE" })}
          style={{ padding: "10px 14px" }}
        >
          Nope
        </button>

        <button
          onClick={() => dispatch({ type: "SWIPE_LIKE" })}
          style={{ padding: "10px 14px" }}
        >
          Like
        </button>
      </div>

      <div style={{ marginTop: 16, opacity: 0.7 }}>
        <small>
          Card {state.swipeIndex + 1} de {state.roommates.length}
        </small>
      </div>
    </div>
  );
}
