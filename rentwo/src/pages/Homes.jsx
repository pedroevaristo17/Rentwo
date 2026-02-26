import { useContext, useMemo, useState } from "react";
import { AppContext } from "../store/AppProvider";
import homesMock from "../data/homes";

const cityOptions = ["São Paulo", "Rio de Janeiro", "Curitiba", "Belo Horizonte", "Maceió", "Recife", "João Pessoa"];
const typeOptions = ["Todos", "Apartamento", "Casa", "Studio", "Kitnet"];

const homeImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
];

function toCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function Homes() {
  const { state } = useContext(AppContext);
  const preferredCity = (state.profile.city || "").trim();

  const [selectedCity, setSelectedCity] = useState(preferredCity || "Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [showOnlyAffordable, setShowOnlyAffordable] = useState(false);

  const cards = useMemo(
    () =>
      (homesMock || []).map((home, index) => ({
        ...home,
        image: homeImages[index % homeImages.length],
        badges:
          index % 3 === 0
            ? ["Verificado", "Wifi incluso"]
            : index % 3 === 1
              ? ["Pet friendly", "Lavanderia"]
              : ["Academia", "Condomínio incluso"],
      })),
    []
  );

  const visibleHomes = useMemo(() => {
    const profileBudget = Number(state.profile.budgetMax) || 0;

    return cards.filter((home) => {
      const cityOk = selectedCity === "Todos" || home.city === selectedCity;
      const typeOk = selectedType === "Todos" || home.type === selectedType;
      const priceOk = Number(home.price) <= Number(maxPrice);
      const affordableOk = !showOnlyAffordable || profileBudget <= 0 || home.price <= profileBudget;

      return cityOk && typeOk && priceOk && affordableOk;
    });
  }, [cards, selectedCity, selectedType, maxPrice, showOnlyAffordable, state.profile.budgetMax]);

  return (
    <main className="mx-auto max-w-[1100px] px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-500">Brasil / Apartamentos</p>
        <div className="hidden md:flex gap-2">
          <button className="h-10 px-3 rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          <button className="h-10 px-3 rounded-xl border border-slate-200 text-slate-400">
            <span className="material-symbols-outlined text-[18px]">view_list</span>
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-slate-900">Available Homes and Rooms in Brazil</h1>
      <p className="text-slate-600 mt-2 mb-6">Descubra anúncios verificados em várias cidades, com o mesmo padrão Rentwo.</p>

      <section className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm mb-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="text-sm font-medium text-slate-700">
            Preço máximo
            <select
              value={String(maxPrice)}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
            >
              <option value="1500">Até R$ 1.500</option>
              <option value="2500">Até R$ 2.500</option>
              <option value="3500">Até R$ 3.500</option>
              <option value="5000">Até R$ 5.000</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Localização
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
            >
              <option value="Todos">Todas</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Tipo
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-end pb-2 gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={showOnlyAffordable}
              onChange={(e) => setShowOnlyAffordable(e.target.checked)}
              className="size-4 accent-primary"
            />
            Mostrar apenas dentro do meu budget
          </label>
        </div>
      </section>

      {visibleHomes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900">Nenhum imóvel encontrado</h2>
          <p className="text-slate-500 mt-2">Tente ajustar os filtros para ver mais resultados.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleHomes.map((home) => (
            <article
              key={home.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-52">
                <img src={home.image} alt={home.title} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 size-9 rounded-full bg-white/90 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <span className="absolute bottom-3 left-3 text-xs font-semibold bg-primary text-white px-2.5 py-1 rounded-full">
                  VERIFIED LISTING
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{home.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {home.city}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-3xl font-bold text-slate-900">{toCurrency(home.price)}</p>
                    <p className="text-xs text-slate-500">/ mês</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mt-3">{home.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                    {home.bedrooms} quartos
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                    {home.bathrooms} banheiros
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                    {home.type}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {home.badges.map((badge) => (
                    <span key={badge} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 text-sm">
          <button className="size-9 rounded-lg border border-slate-200 text-slate-400">&lt;</button>
          <button className="size-9 rounded-lg bg-primary text-white font-semibold">1</button>
          <button className="size-9 rounded-lg border border-slate-200 text-slate-700">2</button>
          <button className="size-9 rounded-lg border border-slate-200 text-slate-700">3</button>
          <span className="px-2 text-slate-500">...</span>
          <button className="size-9 rounded-lg border border-slate-200 text-slate-700">12</button>
          <button className="size-9 rounded-lg border border-slate-200 text-slate-400">&gt;</button>
        </div>
      </div>
    </main>
  );
}
