import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/AppProvider";

function getMatchPercent(roommate) {
  if (!roommate?.id) return 90;
  const seed = roommate.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return 85 + (seed % 12);
}

export default function Likes() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const likedIds = state.likesRoommates || [];
  const roommates = state.roommates || [];

  const likedRoommates = useMemo(
    () => roommates.filter((r) => likedIds.includes(r.id)),
    [roommates, likedIds]
  );

  function openChatWith(roommateId) {
    dispatch({ type: "CHAT_OPEN", payload: { otherId: roommateId } });
    const chatId = ["me", roommateId].sort().join("_");
    navigate(`/chat/${chatId}`);
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-background-light via-primary/5 to-accent/10 px-4 py-6 md:px-6">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Matches</h1>
          <p className="text-sm font-semibold text-slate-500">
            {likedRoommates.length} favoritos
          </p>
        </div>

        {likedRoommates.length === 0 ? (
          <div className="rounded-3xl border border-primary/15 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-700">Nenhuma curtida ainda.</p>
            <p className="mt-1 text-slate-500">Vá em Discover e curta perfis para aparecer aqui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {likedRoommates.map((r) => {
              const photo =
                r.photos?.[0] || r.avatarUrl || "https://i.pravatar.cc/900?img=32";
              const tags = Array.isArray(r.tags) ? r.tags.slice(0, 3) : [];
              const matchPercent = getMatchPercent(r);

              return (
                <article
                  key={r.id}
                  className="group overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative p-3 pb-0">
                    <img
                      src={photo}
                      alt={r.name}
                      className="h-72 w-full rounded-2xl object-cover"
                    />

                    <span className="absolute bottom-4 left-5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow">
                      📍 {r.city || "Cidade"}
                    </span>

                    <div className="absolute right-5 top-5">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId((prev) => (prev === r.id ? null : r.id))
                        }
                        className="flex size-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow hover:text-primary"
                        aria-label="Opções"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          more_horiz
                        </span>
                      </button>

                      {openMenuId === r.id && (
                        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-primary/15 bg-white shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              dispatch({
                                type: "LIKE_REMOVE",
                                payload: { roommateId: r.id },
                              });
                              setOpenMenuId(null);
                            }}
                            className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-primary/10"
                          >
                            Remover curtida
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-end justify-between">
                      <h2 className="text-4 font-bold text-slate-900">
                        {r.name}, {r.age}
                      </h2>
                      <p className="text-sm font-semibold text-slate-500">
                        R$ {Number(r.budgetMax || 0).toLocaleString("pt-BR")}/mês
                      </p>
                    </div>

                    {tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-xs font-semibold text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {r.bio || "Sem bio cadastrada."}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <p className="text-sm font-semibold text-slate-600">
                        {matchPercent}% Match
                      </p>

                      <button
                        type="button"
                        onClick={() => openChatWith(r.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90"
                      >
                        Abrir chat
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}



// src/pages/Likes.jsx
/*import { useContext } from "react";
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
}*/