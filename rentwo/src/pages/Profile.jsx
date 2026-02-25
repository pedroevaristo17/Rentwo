import { useContext, useState } from "react";
import { AppContext } from "../store/AppProvider";
import { uploadAvatar } from "../lib/upload";

export default function Profile() {
  const { state, dispatch } = useContext(AppContext);

  const [city, setCity] = useState(state.profile.city || "");
  // ✅ budget como string pra você poder apagar e digitar normal
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

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Escolha uma imagem.");
      return;
    }

    try {
      const url = await uploadAvatar(file);

      dispatch({
        type: "PROFILE_UPDATE",
        payload: { avatarUrl: url },
      });
    } catch (err) {
      console.error(err);
      alert("Falha ao enviar imagem.");
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Perfil</h1>

      {/* Cidade */}
      <div style={{ marginTop: 12 }}>
        <label htmlFor="city">Cidade</label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ex: Maceió"
          style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      {/* Budget */}
      <div style={{ marginTop: 12 }}>
        <label htmlFor="budget">Budget máximo (R$)</label>
        <input
          id="budget"
          type="number"
          value={budgetMax}
          onChange={(e) => setBudgetMax(e.target.value)}
          placeholder="Ex: 1500"
          style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      {/* Botões */}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={handleSave} style={{ padding: "10px 14px" }}>
          Salvar preferências
        </button>

        <button
          onClick={() => dispatch({ type: "RESET_APP" })}
          style={{ padding: "10px 14px" }}
        >
          Resetar app
        </button>
      </div>

      {/* Foto de perfil */}
      <div style={{ marginTop: 12 }}>
        <label htmlFor="avatar">Foto de perfil</label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />

        {state.profile.avatarUrl ? (
          <div style={{ marginTop: 10 }}>
            <img
              src={state.profile.avatarUrl}
              alt="avatar"
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </div>
        ) : null}
      </div>

      {/* Info atual */}
      <div style={{ marginTop: 14, opacity: 0.7 }}>
        <small>
          Preferências atuais: {state.profile.city || "(sem cidade)"} • Budget:{" "}
          {state.profile.budgetMax || 0}
        </small>
      </div>
    </div>
  );
}