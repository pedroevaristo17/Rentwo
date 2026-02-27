import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../store/AppProvider";
import rentwoLogo from "../assets/rentwo-logo.png"

export default function TopNav() {
  const { state } = useContext(AppContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary text-sm font-semibold border-b-2 border-primary pb-1"
      : "text-slate-600 text-sm font-medium hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-gradient-to-r from-white via-primary/5 to-accent/10 backdrop-blur">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <img src={rentwoLogo} alt="Rentwo" className="h-9 w-auto object-contain"/>  
          </div>

          <label className="hidden md:flex flex-col min-w-40 h-10 max-w-72">
            <div className="flex w-full h-full items-stretch rounded-xl">
              <div className="text-slate-500 flex bg-slate-100 items-center justify-center pl-4 rounded-l-xl">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="form-input w-full border-none bg-slate-100 focus:ring-0 h-full placeholder:text-slate-500 px-4 rounded-r-xl text-base"
                placeholder="Search locations..."
                value=""
                readOnly
              />
            </div>
          </label>
        </div>

        <nav className="flex flex-1 justify-end flex-wrap gap-x-6 gap-y-2 items-center">
          <NavLink to="/swipe" className={linkClass}>
            Discover
          </NavLink>
          <NavLink to="/homes" className={linkClass}>
            Homes
          </NavLink>
          <NavLink to="/likes" className={linkClass}>
            Matches
          </NavLink>
          <NavLink to="/chat" className={linkClass}>
            Messages
          </NavLink>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
            </button>
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </button>

            <NavLink
              to="/profile"
              aria-label="Abrir perfil"
              className="hidden sm:block rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary/20"
                style={{
                  backgroundImage: `url(${state.profile.avatarUrl || "https://i.pravatar.cc/200?img=11"})`,
                }}
              />
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
