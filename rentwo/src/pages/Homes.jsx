// src/pages/Homes.jsx
import { useContext, useMemo } from "react";
import { AppContext } from "../store/AppProvider";
import homesMock from "../data/homes";

export default function Homes() {
  const { state } = useContext(AppContext);

  const cityPref = (state.profile.city || "").trim();

  const filteredHomes = useMemo(() => {
    if (!cityPref) return [];
    const cityLower = cityPref.toLowerCase();
    return (homesMock || []).filter(
      (h) => (h.city || "").trim().toLowerCase() === cityLower
    );
  }, [cityPref]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Imóveis</h1>

      {!cityPref ? (
        <p>
          Defina uma <strong>cidade</strong> no Perfil para ver imóveis.
        </p>
      ) : filteredHomes.length === 0 ? (
        <p>Nenhum imóvel encontrado para {cityPref}.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {filteredHomes.map((h) => (
            <li
              key={h.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <strong>{h.title}</strong>
              <div style={{ marginTop: 6, opacity: 0.85 }}>
                {h.city} • R$ {h.price}/mês • {h.type}
              </div>
              <div style={{ marginTop: 6, opacity: 0.8 }}>{h.description}</div>

              <div style={{ marginTop: 8, opacity: 0.75 }}>
                Quartos: {h.bedrooms} • Banheiros: {h.bathrooms}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}