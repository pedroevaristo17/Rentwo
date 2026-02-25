import { useContext, useMemo } from "react";
import { AppContext } from "../store/AppProvider";
import PhotoCarousel from "../components/PhotoCarousel";

export default function Swipe() {
  const { state, dispatch } = useContext(AppContext);

  const visibleRoommates = useMemo(() => {
    const cityPref = (state.profile.city || "").trim().toLowerCase();
    const budgetMax = Number(state.profile.budgetMax) || 0;

    return (state.roommates || []).filter((r) => {
      const rCity = (r.city || "").trim().toLowerCase();
      const cityOk = !cityPref || rCity === cityPref;

      const rBudget = Number(r.budgetMax) || 0;
      const budgetOk = budgetMax <= 0 || rBudget <= budgetMax;

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
      <div className="bg-background-light min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-2">Acabou por enquanto 🙂</h2>
          <p className="text-slate-500 mb-4">
            Ajuste suas preferências ou resete o app.
          </p>
          <button
            onClick={() => dispatch({ type: "RESET_APP" })}
            className="w-full h-11 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition shadow-xl shadow-primary/20"
          >
            Resetar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-background-light via-primary/5 to-accent/10">
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[680px] flex flex-col items-center">
          {/* header compacto */}
          <div className="text-center mb-5">
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              Find your perfect match
            </h1>
            <p className="text-slate-600 mt-2">
              Based on your preferences in{" "}
              {state.profile.city || "your city"}.
            </p>
          </div>

          {/* card */}
          <div className="w-full bg-white/95 backdrop-blur rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/15">
            <div className="relative h-[460px]">
              <PhotoCarousel photos={current.photos} alt={current.name} />

              {/* badge roxo */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl shadow-accent/25 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">bolt</span>
                  95% Match
                </div>
              </div>

              {/* overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {current.name}, {current.age}
                    </h3>
                    <p className="text-sm flex items-center gap-1 text-white/80">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      {current.city}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase font-bold tracking-wide text-white/70">
                      Budget
                    </p>
                    <p className="text-lg font-bold">
                      R$ {current.budgetMax}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* about compacto */}
            <div className="px-6 py-5">
              <h4 className="font-bold text-lg text-primary mb-1">About</h4>
              <p className="text-slate-700 text-base leading-relaxed">
                {current.bio}
              </p>

              {Array.isArray(current.tags) && current.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {current.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* botões: com espaço embaixo pra não cortar */}
          <div className="flex items-center gap-12 mt-5 pb-2">
            <button
              onClick={() => dispatch({ type: "SWIPE_NOPE" })}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="size-14 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:text-red-500 group-hover:border-red-200 group-hover:bg-red-50 shadow-md transition-all duration-200">
                <span className="material-symbols-outlined text-[30px]">
                  close
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-500">
                Pass
              </span>
            </button>

            <button
              onClick={() => dispatch({ type: "SWIPE_LIKE" })}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="size-14 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/30 ring-4 ring-primary/15 transform hover:scale-110 transition-all duration-200">
                <span className="material-symbols-outlined text-[30px]">
                  favorite
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Like
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}