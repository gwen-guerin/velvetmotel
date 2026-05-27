import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../data/config";

// ─── Icône Instagram ──────────────────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Liens de navigation ──────────────────────────────────────────────────────
const navLinks = [
  { to: "/", label: "Accueil", end: true },
  { to: "/media", label: "Médias" },
  { to: "/dates", label: "Dates" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile lors d'un resize vers desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[2000] transition-all duration-400 ${
        scrolled
          ? "bg-motel-black/90 backdrop-blur-md border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto  flex items-center justify-between">
        {/* ── Logo ── */}
        <Link
          to="/"
          className="select-none"
          aria-label="Velvet Motel — accueil"
        >
          <img
            src="/logoVelvetMotel.png"
            alt="Velvet Motel"
            className="h-20 w-auto"
          />
        </Link>


        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-8 px-6 py-4">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative pb-0.5 font-condensed text-[1.05rem] tracking-wider transition-colors duration-200 ${
                  isActive
                    ? "text-neon-red"
                    : "text-cream/80 hover:text-neon-pink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {/* Soulignement rouge néon pour le lien actif */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                    style={{
                      background: "#ff2442",
                      boxShadow: isActive
                        ? "0 0 6px #ff2442, 0 0 12px #ff2442"
                        : "none",
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                </>
              )}
            </NavLink>
          ))}

          {/* Instagram */}
          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/60 hover:text-neon-pink transition-colors duration-200"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>

        {/* ── Hamburger mobile ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <motion.span
            className="block w-full h-px bg-cream origin-center"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22 }}
          />
          <motion.span
            className="block w-full h-px bg-cream"
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.18 }}
          />
          <motion.span
            className="block w-full h-px bg-cream origin-center"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22 }}
          />
        </button>
      </div>

      {/* ── Menu mobile ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-motel-black/95 backdrop-blur-md border-t border-white/[0.04]"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-condensed text-3xl tracking-widest transition-all duration-200 ${
                      isActive ? "text-neon-red" : "text-cream/80"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { textShadow: "0 0 12px #ff2442" } : {}
                  }
                >
                  {label}
                </NavLink>
              ))}

              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-cream/50 hover:text-neon-pink transition-colors duration-200 font-body text-sm mt-2"
              >
                <InstagramIcon />
                <span>{config.instagramHandle}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
