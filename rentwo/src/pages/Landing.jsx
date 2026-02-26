import { Link } from "react-router-dom";
import rentwoLogo from "../assets/logo-rentwo.svg";

const steps = [
  {
    title: "1. Discover your vibe",
    description:
      "Swipe through verified profiles that share your lifestyle and living habits.",
    icon: "groups",
  },
  {
    title: "2. Find a match",
    description:
      "Our compatibility engine suggests people you'll actually get along with.",
    icon: "favorite",
  },
  {
    title: "3. Chat & move in",
    description:
      "Message potential roommates safely and coordinate your move with confidence.",
    icon: "key",
  },
];

export default function Landing() {
  return (
    <main className="bg-[#f3f3f5] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <img src={rentwoLogo} alt="Rentwo" className="h-8 w-auto" />

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#how-it-works" className="hover:text-primary">How it Works</a>
            <a href="#safety" className="hover:text-primary">Safety</a>
            <Link to="/homes" className="hover:text-primary">Homes</Link>
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <Link to="/chat" className="text-slate-600 hover:text-primary">Login</Link>
            <Link
              to="/swipe"
              className="rounded-full bg-primary px-5 py-2 font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Trusted by 5,000+ students in Brazil
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Find someone to live with — <span className="text-primary">not just a place.</span>
          </h1>
          <p className="mt-5 max-w-md text-slate-600">
            Find your perfect roommate based on lifestyle, habits and values.
            Secure, verified and 100% human.
          </p>
          <Link
            to="/swipe"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 hover:bg-blue-700"
          >
            Start Matching
          </Link>
        </div>

        <div className="overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
            alt="Friends sharing food"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-white/70 px-6 py-20 text-center">
        <p className="mx-auto max-w-3xl text-3xl font-bold leading-snug">
          “Rentwo didn't just find me an apartment; they found me a community.”
        </p>
        <p className="mt-4 text-sm text-slate-500">Ana Clara, 26 · Marketing Professional, Rio</p>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-4xl font-extrabold">How it Works</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="safety" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-gradient-to-br from-[#10263d] to-[#1e3f60] p-10 text-center shadow-lg">
            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/25 text-white/80">
              ROOMMATE<br />INTEGRITY<br />MANUAL
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold">Trust & Safety first.</h2>
            <p className="mt-3 text-slate-600">
              We take stress out of finding a home by ensuring everyone in our
              community is who they say they are.
            </p>
            <ul className="mt-8 space-y-6">
              <li>
                <h3 className="text-lg font-bold">Verified Profiles</h3>
                <p className="text-slate-600">Identity verification is mandatory for every member.</p>
              </li>
              <li>
                <h3 className="text-lg font-bold">Secure Chat</h3>
                <p className="text-slate-600">Protect your privacy by chatting through our encrypted platform.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-16 text-center text-white shadow-xl">
          <h2 className="text-5xl font-black leading-tight">Your perfect roommate is just a match away.</h2>
          <p className="mx-auto mt-6 max-w-xl text-white/90">
            Join thousands of students and young professionals finding their people in Brazil's biggest cities.
          </p>
          <Link
            to="/swipe"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-semibold text-primary hover:bg-slate-100"
          >
            Start Matching Now
          </Link>
        </div>
      </section>
    </main>
  );
}
