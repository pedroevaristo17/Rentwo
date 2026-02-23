import { useContext, useMemo } from "react";
import { AppContext } from "../store/AppProvider";

export default function Swipe() {
  const { state, dispatch } = useContext(AppContext);

  const visibleRoommates = useMemo(() => {
    const cityPref = (state.profile.city || "").trim().toLowerCase();
    const budgetMax = Number(state.profile.budgetMax) || 0;

    return (state.roommates || []).filter((r) => {
      const rCity = (r.city || "").trim().toLowerCase();
      const cityOk = !cityPref || rCity === cityPref;

      // se o budgetMax for 0, ignora filtro
      const rBudget = Number(r.budgetMax) || 0;
      const budgetOk = budgetMax <= 0 || rBudget <= budgetMax;

      // opcional: não mostrar quem já foi curtido/recusado
      const alreadySeen =
        (state.likesRoommates || []).includes(r.id) ||
        (state.dislikesRoommates || []).includes(r.id);

      return cityOk && budgetOk && !alreadySeen;
    });
  }, [
    state.profile.city,
    state.profile.budgetMax,
    state.roommates,
    state.likesRoommates,
    state.dislikesRoommates,
  ]);

  const current = visibleRoommates?.[state.swipeIndex];

  if (!current) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Swipe</h1>
        <p>Acabou por enquanto 🙂</p>
        <p style={{ opacity: 0.7 }}>
          Dica: ajuste a cidade/budget no Perfil ou resete o app.
        </p>

        <button
          onClick={() => dispatch({ type: "RESET_APP" })}
          style={{ padding: "10px 14px", marginTop: 10 }}
        >
          Resetar app
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Swipe</h1>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, marginTop: 12 }}>
        <h2 style={{ margin: 0 }}>
          {current.name} • {current.age}
        </h2>
        <p style={{ marginTop: 8 }}>{current.bio}</p>
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          📍 {current.city} • Budget: {current.budgetMax}
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

      
    </div>
  );
}