import { useContext, useState } from "react";
import { AppContext } from "../store/AppProvider";

export default function Profile() {
  const { state, dispatch } = useContext(AppContext);

  const [city, setCity] = useState(state.profile.city || "");
  const [budgetMax, setBudgetMax] = useState(
    state.profile.budgetMax ? String(state.profile.budgetMax) : ""
  );

  function handleSave() {
    dispatch({
      type: "PROFILE_UPDATE",
      payload: {
        city: city.trim(),
        budgetMax: budgetMax ? Number(budgetMax) : 0,
      },
    });
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Perfil</h1>

      {/* Cidade */}
      <div style={{ marginTop: 12 }}>
        <label>Cidade</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ex: Maceió"
          style={{
            display: "block",
            width: "100%",
            padding: 10,
            marginTop: 6,
          }}
        />
      </div>

      {/* Budget */}
      <div style={{ marginTop: 12 }}>
        <label>Budget máximo (R$)</label>
        <input
          type="number"
          value={budgetMax}
          onChange={(e) => setBudgetMax(e.target.value)}
          placeholder="Ex: 1500"
          style={{
            display: "block",
            width: "100%",
            padding: 10,
            marginTop: 6,
          }}
        />
      </div>

      {/* Botões */}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          onClick={handleSave}
          style={{ padding: "10px 14px" }}
        >
          Salvar preferências
        </button>

        <button
          onClick={() => dispatch({ type: "RESET_APP" })}
          style={{ padding: "10px 14px" }}
        >
          Resetar app
        </button>
      </div>

      {/* Info atual */}
      <div style={{ marginTop: 14, opacity: 0.7 }}>
        <small>
          Preferências atuais:{" "}
          {state.profile.city || "(sem cidade)"} • Budget:{" "}
          {state.profile.budgetMax || 0}
        </small>
      </div>
    </div>
  );
}