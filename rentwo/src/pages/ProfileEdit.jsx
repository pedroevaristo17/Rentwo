import { useContext, useState } from "react";
import { AppContext } from "../store/AppProvider";
import { uploadAvatar } from "../lib/upload";

export default function ProfileEdit() {
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
    <main className="mx-auto max-w-[1100px] px-4 lg:px-8 py-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Editar perfil</h1>
        <p className="text-slate-500 mt-1">Atualize suas preferências de busca.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Cidade
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: São Paulo"
              className="h-11 rounded-xl border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Budget máximo (R$)
            <input
              id="budget"
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              placeholder="Ex: 1500"
              className="h-11 rounded-xl border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>

        <div className="mt-6">
          <label
            htmlFor="avatar"
            className="text-sm font-medium text-slate-700 block mb-2"
          >
            Foto de perfil
          </label>
          <input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />

          {state.profile.avatarUrl ? (
            <img
              src={state.profile.avatarUrl}
              alt="avatar"
              className="mt-3 size-24 rounded-xl object-cover border border-slate-200"
            />
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleSave}
            className="h-11 px-5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90"
          >
            Salvar preferências
          </button>
          <button
            onClick={() => dispatch({ type: "RESET_APP" })}
            className="h-11 px-5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Resetar app
          </button>
        </div>

        <p className="text-sm text-slate-500 mt-4">
          Preferências atuais: {state.profile.city || "(sem cidade)"} • Budget: R${" "}
          {state.profile.budgetMax || 0}
        </p>
      </div>
    </main>
  );
}
