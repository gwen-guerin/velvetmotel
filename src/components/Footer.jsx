import { config } from "../data/config";

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
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

// ─────────────────────────────────────────────────────────────────────────────
// Footer — Instagram + email + copyright
// Éditez src/data/config.js pour changer les liens de contact.
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-motel-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <img
            src="/logoVelvetMotel.png"
            alt="Velvet Motel"
            className="h-20 w-auto"
          />
          {/* Logo texte néon — conservé pour référence
          <div className="text-center md:text-left select-none">
            <span className="font-script text-3xl text-neon-pink" style={{ textShadow: '0 0 10px #ff6b8a, 0 0 20px #ff2442' }}>Velvet</span>
            <span className="font-condensed text-2xl text-neon-red tracking-widest ml-1" style={{ textShadow: '0 0 10px #ff2442' }}>MOTEL</span>
          </div>
          */}

          {/* Liens contact */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-cream/50 hover:text-neon-pink transition-colors duration-200"
            >
              <InstagramIcon />
              <span>{config.instagramHandle}</span>
            </a>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <a
              href={`mailto:${config.email}`}
              className="font-body text-sm text-cream/50 hover:text-neon-pink transition-colors duration-200"
            >
              {config.email}
            </a>
          </div>

          {/* Copyright */}
          <p className="font-condensed text-xs tracking-wider text-cream/15">
            © {new Date().getFullYear()} VELVET MOTEL
          </p>
        </div>

        {/* Ligne décorative */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neon-red/25 to-transparent" />
      </div>
    </footer>
  );
}
