import { Link } from "react-router-dom";
import rentwoLogo from "../assets/logo-rentwo.svg";
import heroUniversitarios from "../assets/landing/hero-universitarios.webp";
import safetyPerfil from "../assets/landing/safety-perfil.webp";

const steps = [
  {
    title: "1. Discover your vibe",
    description:
      "Swipe through verified profiles that share your living habits and music taste.",
    icon: "group",
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "2. Find a Match",
    description:
      "Our compatibility engine suggests people you'll actually get along with.",
    icon: "favorite",
    tone: "bg-accent/15 text-accent",
  },
  {
    title: "3. Chat & Move in",
    description:
      "Message potential roommates securely and safely. Coordinate your move easily.",
    icon: "key",
    tone: "bg-primary/10 text-primary",
  },
];

const trustItems = [
  {
    title: "Verified Profiles",
    description:
      "Identity verification is mandatory. Every roommate you see is a real, verified person.",
    icon: "verified_user",
  },
  {
    title: "Secure Chat",
    description:
      "Protect your privacy by chatting through our encrypted platform before sharing personal details.",
    icon: "shield_lock",
  },
];

export default function Landing() {
  return (
    <main className="bg-background-light text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <img src={rentwoLogo} alt="Rentwo" className="h-8 w-auto" />

          <nav className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex">
            <a href="#how-it-works" className="transition hover:text-primary">How it Works</a>
            <a href="#safety" className="transition hover:text-primary">Safety</a>
            <Link to="/homes" className="transition hover:text-primary">Homes</Link>
          </nav>

          <div className="flex items-center gap-2 text-sm sm:gap-4">
            <Link to="/chat" className="px-2 text-slate-600 transition hover:text-primary">Login</Link>
            <Link
              to="/swipe"
              className="rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-soft transition hover:brightness-95 sm:px-6"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_minmax(280px,500px)] md:items-center md:py-16 lg:px-8 lg:py-20">
        <div>
          <p className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
            TRUSTED BY 5,000+ STUDENTS IN BRAZIL
          </p>
          <h1 className="max-w-xl text-[2.35rem] font-black leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
            Find someone
            <br />
            to live with —
            <br />
            <span className="text-primary">not just a place.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            Find your perfect roommate based on lifestyle, habits, and values. Secure, verified, and 100% human.
          </p>

          <div className="mt-8">
            <Link
              to="/swipe"
              className="inline-flex rounded-full bg-primary px-7 py-3 text-base font-semibold text-white shadow-soft transition hover:brightness-95"
            >
              Start Matching
            </Link>
            <div>
              <Link
                to="/homes"
                className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-primary"
              >
                Explore Homes <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        <article className="overflow-hidden rounded-[30px] border-[6px] border-white bg-white shadow-soft">
          <img
            src={heroUniversitarios}
            alt="Universitários conversando e estudando em uma cozinha compartilhada"
            loading="lazy"
            decoding="async"
            className="h-[360px] w-full object-cover object-center sm:h-[420px] lg:h-[500px]"
          />
        </article>
      </section>

      <section className="bg-white px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-4xl leading-none text-accent/35">❞</p>
          <p className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            "Rentwo didn't just find me an apartment; they found me a community. I moved to Rio knowing nobody, and within a week I had a roommate who feels like family."
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-xs font-semibold text-white">
              AC
            </div>
            <p className="text-left text-sm text-slate-600">
              <span className="block font-semibold text-slate-900">Ana Clara, 26</span>
              Marketing Professional, Rio
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="text-center text-4xl font-black text-slate-900">How it Works</h2>
        <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-accent/45" />

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-7">
          {steps.map((step) => (
            <article key={step.title} className="rounded-[26px] border border-slate-200 bg-white p-7 text-center shadow-soft">
              <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${step.tone}`}>
                <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="safety" className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <article className="overflow-hidden rounded-[26px] shadow-soft">
            <img
              src={safetyPerfil}
              alt="Perfil de segurança com informações verificadas para encontrar roommate"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </article>

          <div>
            <h2 className="text-4xl font-black leading-tight text-slate-900">Trust & Safety first.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              We take the stress out of finding a home by ensuring everyone in our community is who they say they are.
            </p>

            <ul className="mt-8 space-y-6">
              {trustItems.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-[30px] bg-gradient-to-r from-primary to-accent px-6 py-14 text-center text-white shadow-soft sm:px-10 md:py-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Your perfect roommate is just a match away.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/90 sm:text-base">
            Join thousands of students and young professionals finding their people in Brazil's biggest cities.
          </p>
          <Link
            to="/swipe"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-semibold text-primary transition hover:bg-slate-100"
          >
            Start Matching Now
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10 text-sm text-slate-500 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img src={rentwoLogo} alt="Rentwo" className="h-7 w-auto" />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-500">
              The modern way to find roommates in Brazil. Built for lifestyle compatibility, safety, and community.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="transition hover:text-primary">How it Works</a></li>
              <li><a href="#safety" className="transition hover:text-primary">Verified Homes</a></li>
              <li><a href="#safety" className="transition hover:text-primary">Safety Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="transition hover:text-primary">Help Center</a></li>
              <li><a href="#" className="transition hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="transition hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
