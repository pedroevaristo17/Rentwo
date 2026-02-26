import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/AppProvider";

const lifestyleItems = [
  {
    icon: "wb_sunny",
    title: "Madrugador",
    text: "Acordo cedo e gosto de silêncio pela manhã.",
  },
  {
    icon: "smoke_free",
    title: "Não fumante",
    text: "Prefiro ambientes livres de tabaco.",
  },
  {
    icon: "laptop_mac",
    title: "Trabalho remoto",
    text: "Trabalho em casa durante a semana.",
  },
  {
    icon: "pets",
    title: "Pet friendly",
    text: "Tenho um gato e gosto de animais.",
  },
];

export default function Profile() {
  const { state } = useContext(AppContext);
  const avatarUrl = state.profile.avatarUrl || "https://i.pravatar.cc/240?img=11";
  const city = state.profile.city || "São Paulo";

  return (
    <main className="mx-auto max-w-[1100px] px-4 lg:px-8 py-8 space-y-6">
      <p className="text-sm text-slate-500">Home / Meu Perfil Profissional</p>

      <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex gap-5 items-start">
            <img
              src={avatarUrl}
              alt="Avatar do usuário"
              className="size-28 rounded-full object-cover border-4 border-primary/20"
            />

            <div>
              <h1 className="text-4xl font-bold text-slate-900">Ricardo Silva</h1>
              <p className="text-2xl text-slate-500 mt-1">{city}, Brasil • Membro desde Março 2023</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm font-semibold bg-primary/10 text-primary rounded-full px-3 py-1">
                  Residente verificado
                </span>
                <span className="text-sm font-semibold bg-emerald-100 text-emerald-700 rounded-full px-3 py-1">
                  Identidade confirmada
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/profile/edit"
              className="h-12 px-6 rounded-2xl border border-slate-300 text-slate-800 font-semibold inline-flex items-center gap-2 hover:bg-slate-50"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
              Editar perfil
            </Link>
            <button className="h-12 px-6 rounded-2xl bg-primary text-white font-semibold inline-flex items-center gap-2 hover:bg-primary/90">
              <span className="material-symbols-outlined text-[20px]">share</span>
              Compartilhar
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <article className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-4xl font-bold text-slate-900">Bio pessoal</h2>
            <p className="text-slate-700 text-lg leading-relaxed mt-3">
              Sou designer de produto trabalhando remotamente em São Paulo. Busco um
              ambiente tranquilo e organizado. Gosto de cozinhar nos fins de semana e
              praticar esportes ao ar livre. Tenho um gato muito calmo chamado Oscar.
              Sou organizado com as tarefas domésticas e valorizo a comunicação clara e
              o respeito mútuo em um ambiente compartilhado.
            </p>
          </article>

          <article className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Estilo de vida e hábitos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lifestyleItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex gap-3"
                >
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="space-y-6">
          <article className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Verificações de confiança</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center justify-between">
                <span>E-mail</span>
                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Telefone</span>
                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Documento de identidade</span>
                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Vínculo empregatício</span>
                <span className="material-symbols-outlined text-slate-300">radio_button_unchecked</span>
              </li>
            </ul>
            <button className="w-full h-11 mt-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50">
              Adicionar verificação
            </button>
          </article>

          <article className="bg-primary/5 border border-primary/20 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-primary">Atividade no Rentwo</h2>
            <div className="mt-4 space-y-3 text-slate-700">
              <p className="flex justify-between">
                <span>Taxa de resposta</span>
                <strong>100%</strong>
              </p>
              <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                <div className="h-full w-full bg-primary" />
              </div>
              <p className="flex justify-between">
                <span>Tempo de resposta</span>
                <strong>&lt; 1 hora</strong>
              </p>
              <p className="flex justify-between">
                <span>Anúncios favoritados</span>
                <strong>24</strong>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
