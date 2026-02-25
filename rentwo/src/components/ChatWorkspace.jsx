import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../store/AppProvider";
import { useNavigate } from "react-router-dom";

function getOtherParticipantId(chat) {
  return chat?.participants?.find((p) => p !== "me") || null;
}

function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelative(ts) {
  if (!ts) return "";
  const deltaMin = Math.max(1, Math.floor((Date.now() - ts) / 60000));
  if (deltaMin < 60) return `${deltaMin}m`;
  const deltaHour = Math.floor(deltaMin / 60);
  if (deltaHour < 24) return `${deltaHour}h`;
  return `${Math.floor(deltaHour / 24)}d`;
}

function getStatusLabel(roommate) {
  const options = ["ONLINE", "AWAY", "RECENTLY ACTIVE"];
  const index = (roommate?.name?.length || 0) % options.length;
  return options[index];
}

function getMatchPercent(roommate) {
  if (!roommate?.id) return 90;
  const seed = roommate.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return 85 + (seed % 12);
}

function getRating(roommate) {
  if (!roommate?.id) return 4.7;
  const seed = roommate.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (4.3 + (seed % 7) * 0.1).toFixed(1);
}

export default function ChatWorkspace({ forcedChatId = null }) {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate()
  const [selectedChatId, setSelectedChatId] = useState(forcedChatId);
  const [text, setText] = useState("");
  const [showProfilePanel, setShowProfilePanel] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : true
  );
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const chatsArray = useMemo(() => {
    const chatsObj = state.chats || {};
    return Object.values(chatsObj).sort((a, b) => {
      const aLast = a.messages?.[a.messages.length - 1]?.createdAt || a.createdAt || 0;
      const bLast = b.messages?.[b.messages.length - 1]?.createdAt || b.createdAt || 0;
      return bLast - aLast;
    });
  }, [state.chats]);

  useEffect(() => {
    if (forcedChatId) {
      setSelectedChatId(forcedChatId);
      return;
    }

    if (!isMobile && !selectedChatId && chatsArray[0]?.id) {
      setSelectedChatId(chatsArray[0].id);
    }

    if (isMobile && !forcedChatId) {
      setSelectedChatId((prev) => prev ?? null);
    }
  }, [forcedChatId, isMobile, selectedChatId, chatsArray]);

  const activeChat = useMemo(() => {
    if (!selectedChatId) return null;
    return state.chats?.[selectedChatId] || null;
  }, [selectedChatId, state.chats]);

  const activeRoommate = useMemo(() => {
    const otherId = getOtherParticipantId(activeChat);
    if (!otherId) return null;
    return (state.roommates || []).find((r) => r.id === otherId) || null;
  }, [activeChat, state.roommates]);

  if (chatsArray.length === 0) {
    return (
      <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-background-light via-primary/5 to-accent/10 px-4 py-6">
        <div className="mx-auto max-w-[1200px] rounded-3xl border border-primary/15 bg-white/70 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="mt-3 text-slate-600">
            Nenhuma conversa ainda. Abra um chat na aba de curtidas.
          </p>
        </div>
      </div>
    );
  }

  const activeMessages = activeChat?.messages || [];
  const showList = !isMobile || !selectedChatId;
  const showChat = !isMobile || !!selectedChatId;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-background-light via-primary/5 to-accent/10 px-3 py-4 md:px-6 md:py-6">
      <div
        className={`mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-4 rounded-3xl border border-primary/15 bg-white/70 p-3 shadow-xl ${
          !isMobile && showProfilePanel
            ? "lg:grid-cols-[320px_1fr_320px]"
            : !isMobile
            ? "lg:grid-cols-[360px_1fr]"
            : ""
        }`}
      >
        {showList && (
          <aside className="rounded-3xl border border-primary/15 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-4 font-bold tracking-tight text-slate-900">Garden Paths</h2>
              <span className="material-symbols-outlined text-primary">edit_square</span>
            </div>

            <div className="mb-4 flex items-center gap-2 rounded-2xl border border-primary/10 bg-background-light px-3 py-2 text-slate-500">
              <span className="material-symbols-outlined text-[19px]">search</span>
              <span className="text-sm">Find a connection...</span>
            </div>

            <ul className="space-y-2">
              {chatsArray.map((chat) => {
                const otherId = getOtherParticipantId(chat);
                const roommate = (state.roommates || []).find((r) => r.id === otherId);
                const lastMessage = chat.messages?.[chat.messages.length - 1];
                const preview = lastMessage?.text || "Sem mensagens ainda";
                const isActive = chat.id === selectedChatId;
                const avatar =
                  roommate?.photos?.[0] ||
                  roommate?.avatarUrl ||
                  "https://i.pravatar.cc/120?img=35";

                return (
                  <li key={chat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChatId(chat.id);
                        if (isMobile) setShowProfilePanel(false);
                      }}
                      className={`w-full rounded-2xl border p-3 text-left transition ${
                        isActive
                          ? "border-primary/30 bg-primary/8 shadow-sm"
                          : "border-transparent hover:border-primary/20 hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={avatar}
                          alt={roommate?.name || "Contato"}
                          className="size-12 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-base font-bold text-slate-900">
                              {roommate?.name || otherId}
                            </p>
                            <span className="text-xs font-semibold text-slate-500">
                              {formatRelative(lastMessage?.createdAt || chat.createdAt)}
                            </span>
                          </div>
                          <p className="truncate text-sm text-slate-600">{preview}</p>
                          <p className="mt-1 text-[11px] font-semibold tracking-wide text-primary">
                            {getStatusLabel(roommate)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        {showChat && (
          <section className="flex min-h-[660px] flex-col rounded-3xl border border-primary/15 bg-white">
            <header className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                {isMobile && (
                  <button
                    type="button"
                    onClick={() => {
                        setShowProfilePanel(false)
                        if (forcedChatId) {
                            navigate("/chat", { replace: true })
                        } else {
                            setSelectedChatId(null)
                        }
                    }}
                    className="mr-1 flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                )}

                <img
                  src={
                    activeRoommate?.photos?.[0] ||
                    activeRoommate?.avatarUrl ||
                    "https://i.pravatar.cc/120?img=35"
                  }
                  alt={activeRoommate?.name || "Contato"}
                  className="size-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setShowProfilePanel(true)}
                    className="truncate text-left text-xl font-bold text-slate-900"
                  >
                    {activeRoommate?.name || "Contato"}
                  </button>
                  <p className="text-xs font-semibold tracking-wide text-primary">
                    {getStatusLabel(activeRoommate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowProfilePanel((v) => (isMobile ? true : !v))}
                  className={`flex size-9 items-center justify-center rounded-lg transition ${
                    showProfilePanel
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined">person</span>
                </button>
                <div className="relative">
                    <button type="button" onClick={() => setShowMoreMenu((v) => !v)} className="flex size-9 items-center rounded-lg
                    text-slate-500 hover:bg-primary/10 hover:text-primary ">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                    
                    {showMoreMenu && (
                        <div className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-xl border border-primary/15 bg-white shadow-xl">
                        <button
                            type="button"
                            onClick={() => setShowMoreMenu(false)}
                            className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-primary/10"
                        >
                            Bloquear Perfil
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowMoreMenu(false)}
                            className="block w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            Reportar Perfil
                        </button>
                        </div>
                    )}
                </div>
              </div>
            </header>

            <div className="flex-1 space-y-5 overflow-auto bg-gradient-to-b from-background-light/60 to-white px-4 py-5 md:px-8">
              <div className="mx-auto w-fit rounded-full bg-white px-4 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                TODAY
              </div>

              <div className="rounded-3xl border border-primary/15 bg-white px-5 py-4 shadow-sm md:max-w-[70%]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Seed for thought
                </p>
                <p className="mt-2 text-slate-700">
                  Pergunte sobre rotina, orçamento e convivência para criar conexão.
                </p>
              </div>

              {activeMessages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-primary/25 bg-white/80 px-5 py-4 text-sm text-slate-600">
                  Nenhuma mensagem ainda. Comece a conversa abaixo.
                </div>
              ) : (
                activeMessages.map((m) => {
                  const mine = m.senderId === "me";
                  return (
                    <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[78%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                        <div
                          className={`rounded-3xl px-4 py-3 shadow-sm ${
                            mine
                              ? "bg-primary text-white"
                              : "border border-slate-200 bg-white text-slate-800"
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{m.text}</p>
                        </div>
                        <span className="mt-1 text-xs text-slate-500">{formatTime(m.createdAt)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = text.trim();
                if (!trimmed || !selectedChatId) return;
                dispatch({
                  type: "CHAT_SEND_MESSAGE",
                  payload: { chatId: selectedChatId, text: trimmed },
                });
                setText("");
              }}
              className="border-t border-primary/10 bg-white p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 items-center gap-2 rounded-2xl border border-primary/15 bg-background-light/50 px-3">
                  <span className="material-symbols-outlined text-slate-500">image</span>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Plant a thought..."
                    className="h-12 w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 rounded-2xl bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                >
                  Send
                </button>
              </div>
            </form>
          </section>
        )}

        {showProfilePanel && !isMobile && (
          <aside className="rounded-3xl border border-primary/15 bg-white p-5">
            <div className="flex flex-col items-center text-center">
              <img
                src={
                  activeRoommate?.photos?.[0] ||
                  activeRoommate?.avatarUrl ||
                  "https://i.pravatar.cc/200?img=35"
                }
                alt={activeRoommate?.name || "Contato"}
                className="size-24 rounded-full object-cover border-4 border-primary/15"
              />
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {activeRoommate?.name || "Contato"}
              </h3>
              <p className="text-slate-500">
                {activeRoommate?.city || "Cidade não informada"}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-primary/15 bg-background-light p-3 text-center">
                <p className="text-2xl font-bold text-primary">{getMatchPercent(activeRoommate)}%</p>
                <p className="text-xs font-semibold text-slate-500">MATCH</p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-background-light p-3 text-center">
                <p className="text-2xl font-bold text-primary">{getRating(activeRoommate)}</p>
                <p className="text-xs font-semibold text-slate-500">RATING</p>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-500">ABOUT</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {activeRoommate?.bio || "Sem descrição ainda."}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-500">PREFERENCES</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {(activeRoommate?.tags || []).length > 0 ? (
                  activeRoommate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-primary/15 bg-primary/8 px-2 py-1 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Sem preferências cadastradas.</span>
                )}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-500">MEDIA SHARED</h4>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(activeRoommate?.photos || []).slice(0, 3).map((photo, idx) => (
                  <img
                    key={`${photo}-${idx}`}
                    src={photo}
                    alt={`media-${idx + 1}`}
                    className="h-20 w-full rounded-xl object-cover border border-primary/10"
                  />
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {showProfilePanel && isMobile && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            onClick={() => setShowProfilePanel(false)}
            className="absolute inset-0 bg-slate-900/35"
            aria-label="Fechar perfil"
          />
          <aside className="absolute inset-x-0 bottom-0 top-0 bg-white p-5 overflow-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Profile</h3>
              <button
                type="button"
                onClick={() => setShowProfilePanel(false)}
                className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-primary/10 hover:text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src={
                  activeRoommate?.photos?.[0] ||
                  activeRoommate?.avatarUrl ||
                  "https://i.pravatar.cc/200?img=35"
                }
                alt={activeRoommate?.name || "Contato"}
                className="size-24 rounded-full object-cover border-4 border-primary/15"
              />
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {activeRoommate?.name || "Contato"}
              </h3>
              <p className="text-slate-500">{activeRoommate?.city || "Cidade não informada"}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-primary/15 bg-background-light p-3 text-center">
                <p className="text-2xl font-bold text-primary">{getMatchPercent(activeRoommate)}%</p>
                <p className="text-xs font-semibold text-slate-500">MATCH</p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-background-light p-3 text-center">
                <p className="text-2xl font-bold text-primary">{getRating(activeRoommate)}</p>
                <p className="text-xs font-semibold text-slate-500">RATING</p>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-500">ABOUT</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {activeRoommate?.bio || "Sem descrição ainda."}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-500">PREFERENCES</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {(activeRoommate?.tags || []).length > 0 ? (
                  activeRoommate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-primary/15 bg-primary/8 px-2 py-1 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Sem preferências cadastradas.</span>
                )}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold tracking-[0.15em] text-slate-500">MEDIA SHARED</h4>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(activeRoommate?.photos || []).slice(0, 3).map((photo, idx) => (
                  <img
                    key={`${photo}-${idx}`}
                    src={photo}
                    alt={`media-${idx + 1}`}
                    className="h-20 w-full rounded-xl object-cover border border-primary/10"
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
