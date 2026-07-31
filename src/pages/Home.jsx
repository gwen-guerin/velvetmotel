import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { members } from "../data/members";
import { dates } from "../data/dates";
import { config, booking } from "../data/config";

// ─── Helper : reveal au scroll ────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── En-tête de section réutilisable ─────────────────────────────────────────
function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mb-16 text-center">
      <p className="font-condensed text-xs tracking-[0.45em] text-neon-red/50 mb-2 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-condensed text-[clamp(2.8rem,7vw,4.8rem)] tracking-widest text-cream leading-none">
        {title}
      </h2>
      <div className="mt-5 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-neon-red/70 to-transparent" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════════════════

// ⬇ Chronologie de l'intro, en secondes. Le logo grossit sur fond noir, marque
// une pause, puis rétrécit jusqu'à disparaître pendant que la photo de fond
// se révèle à sa place.
const INTRO = {
  grow: 1.0, // fin de la montée du logo
  hold: 1.1, // fin de la pause
  gone: 1.4, // logo totalement disparu / photo installée
};

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Fond noir de départ */}
      <div className="absolute inset-0 z-0 bg-motel-black" />

      {/* Photo de fond, révélée quand le logo s'efface */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: INTRO.hold,
          duration: INTRO.gone - INTRO.hold + 0.4,
          ease: "easeOut",
        }}
      >
        <img
          src="/assets/bg-velvet-field.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Filtre noir 50 % pour ternir la photo */}
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Halo ambiant centré (boosted légèrement) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(255,36,66,0.12) 0%, transparent 72%)",
        }}
      />

      {/* Logo image — positionné en absolu pour ne pas laisser de vide dans la
          colonne une fois qu'il a disparu */}
      <motion.div
        className="absolute z-20 select-none pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.78, 1, 1, 0.3] }}
        transition={{
          duration: INTRO.gone,
          times: [0, INTRO.grow / INTRO.gone, INTRO.hold / INTRO.gone, 1],
          ease: [[0.22, 1, 0.36, 1], "linear", [0.6, 0, 0.85, 0.2]],
        }}
      >
        <img
          src="/logoVelvetMotel.webp"
          alt="Velvet Motel"
          className="w-auto"
          style={{ maxWidth: "clamp(320px, 80vw, 720px)" }}
        />
      </motion.div>

      {/* Sous-titre */}
      <motion.p
        className="relative z-20 font-condensed tracking-[0.45em] text-cream/40"
        style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: INTRO.gone - 0.35, duration: 0.9 }}
      >
        ROCK ALTERNATIF
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: INTRO.gone - 0.1, duration: 0.9 }}
        className="relative z-20 mt-12"
      >
        <a
          href="#booking"
          className="inline-block font-condensed tracking-[0.35em] text-base text-neon-red border border-neon-red/70 px-10 py-3 transition-all duration-300 hover:bg-neon-red/[0.08] hover:border-neon-red hover:shadow-[0_0_18px_rgba(255,36,66,0.22)]"
        >
          DÉCOUVRIR
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-scroll-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO.gone + 0.3, duration: 0.8 }}
        aria-hidden="true"
      >
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,36,66,0.5))",
          }}
        />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="#ff2442"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BOOKING — « on joue chez vous »
// ⬇ Le contenu de cette section s'édite dans src/data/config.js (objet booking)
// ════════════════════════════════════════════════════════════════════════════
function BookingSection() {
  const mailto = `mailto:${config.email}?subject=${encodeURIComponent(
    booking.mailSubject
  )}`;

  return (
    <section id="booking" className="relative py-12 sm:py-24 px-6 bg-motel-black">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Booking" title="ON JOUE CHEZ VOUS" />
        </Reveal>

        {/* Chapô */}
        <Reveal delay={0.1}>
          <p className="font-body text-base sm:text-lg text-cream/55 leading-relaxed max-w-2xl mx-auto text-center -mt-6">
            {booking.intro}
          </p>
        </Reveal>

        {/* Les 4 infos clés */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
          {booking.points.map((point, i) => (
            <Reveal key={point.label} delay={0.15 + i * 0.08}>
              <div className="group h-full bg-motel-black hover:bg-neon-red/[0.03] transition-colors duration-300 p-7 sm:p-8">
                <p className="font-condensed text-[0.7rem] tracking-[0.4em] text-neon-red/50 uppercase">
                  {point.label}
                </p>
                <p
                  className="font-condensed text-[clamp(1.6rem,3.5vw,2.1rem)] tracking-wider text-cream leading-none mt-2 group-hover:text-neon-pink transition-colors duration-300"
                  style={{ textShadow: "0 0 14px rgba(255,36,66,0.12)" }}
                >
                  {point.value}
                </p>
                <p className="font-body text-sm text-cream/45 leading-relaxed mt-3.5">
                  {point.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Contact */}
        <Reveal delay={0.5}>
          <div className="mt-14 text-center">
            <p className="font-condensed text-sm tracking-[0.3em] text-cream/35 uppercase">
              Une date en tête ?
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={mailto}
                className="w-full sm:w-auto font-condensed tracking-[0.3em] text-base bg-neon-red text-motel-black px-10 py-3.5 transition-all duration-300 hover:bg-neon-pink hover:shadow-[0_0_22px_rgba(255,36,66,0.3)]"
              >
                NOUS ÉCRIRE
              </a>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto font-condensed tracking-[0.3em] text-base text-neon-red border border-neon-red/70 px-10 py-3.5 transition-all duration-300 hover:bg-neon-red/[0.08] hover:border-neon-red hover:shadow-[0_0_18px_rgba(255,36,66,0.22)]"
              >
                INSTAGRAM
              </a>
            </div>

            <p className="font-body text-sm text-cream/30 mt-6">
              {config.email} · {config.instagramHandle}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MEMBRES
// ════════════════════════════════════════════════════════════════════════════
function MemberCard({ member, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        className="group relative overflow-hidden border border-white/[0.06] cursor-pointer"
        onClick={() => window.open(member.instagram, "_blank")}
        whileHover={{
          borderColor: "rgba(255,36,66,0.55)",
          boxShadow:
            "0 0 18px rgba(255,36,66,0.12), 0 0 36px rgba(255,36,66,0.06)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.photo}
            alt={`${member.name} — ${member.instrument}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          {/* Overlay rouge au hover */}
          <div className="absolute inset-0 bg-neon-red/0 group-hover:bg-neon-red/[0.14] transition-all duration-500" />
          {/* Vignette basse permanente */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(17,17,17,0.9), transparent)",
            }}
          />
        </div>

        {/* Infos */}
        <div className="p-5 bg-motel-dark">
          <p className="font-condensed text-2xl tracking-widest text-cream">
            {member.name}
          </p>
          <p
            className="font-condensed text-lg tracking-wider text-neon-red mt-0.5"
            style={{ textShadow: "0 0 6px rgba(255,36,66,0.45)" }}
          >
            {member.instrument.toUpperCase()}
          </p>
          <p className="font-body text-sm text-cream/45 mt-2.5 leading-relaxed">
            {member.description}
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

function MembersSection() {
  return (
    <section
      id="qui-on-est"
      className="relative py-12 sm:py-24 px-6 overflow-hidden"
    >
      {/* Background crew.jpg désaturé et assombri */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/crew.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: "saturate(0.4) brightness(0.25)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(17,17,17,0.55)" }}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Le groupe" title="QUI ON EST" />
        </Reveal>
        {/* Grid : 1 col mobile → 2 tablette → 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// INFLUENCES
// ════════════════════════════════════════════════════════════════════════════

// ⬇ Modifiez cette liste pour changer les artistes affichés
const influences = [
  "Radiohead",
  "Nirvana",
  "Arctic Monkeys",
  "Red Hot Chili Peppers",
  "The Doors",
  "The Kooks",
  "Rage Against the Machine",
  "Pixies",
  "M",
  "Louise Attaque",
];

function InfluencesSection() {
  return (
    <section className="py-12 sm:py-24 px-6 bg-motel-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Répertoire" title="NOS INFLUENCES" />
        </Reveal>

        {/* Artistes en flex-wrap typographique */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4">
          {influences.map((band, i) => (
            <motion.span
              key={band}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="font-condensed text-[clamp(1.6rem,3.5vw,2.5rem)] tracking-wider text-cream/25 hover:text-cream transition-all duration-300 cursor-default select-none"
              style={{
                "--glow": "0 0 16px rgba(255,36,66,0.5)",
              }}
              whileHover={{
                color: "#f0e6d3",
                textShadow: "0 0 16px rgba(255,36,66,0.4)",
              }}
            >
              {band}
              {i < influences.length - 1 && (
                <span className="ml-5 text-neon-red/20 text-2xl font-condensed">
                  ·
                </span>
              )}
            </motion.span>
          ))}
        </div>

        {/* Texte décoratif géant en fond */}
        <motion.div
          className="mt-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          aria-hidden="true"
        >
          <p
            className="font-condensed whitespace-nowrap select-none leading-none tracking-widest"
            style={{
              fontSize: "clamp(5rem, 14vw, 12rem)",
              color: "rgba(255,255,255,0.025)",
              marginLeft: "-3%",
              letterSpacing: "0.12em",
            }}
          >
            ROCK · ALTERNATIF · INDIE · LIVE
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// APERÇU DES DATES
// ════════════════════════════════════════════════════════════════════════════
function DatesPreview() {
  const upcoming = dates.slice(0, 3);
  const navigate = useNavigate();
  if (upcoming.length === 0) return null;

  function goToMap(id) {
    navigate("/dates", { state: { activeId: id } });
  }

  return (
    <section className="py-12 sm:py-24 px-6 bg-motel-dark">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Agenda" title="PROCHAINES DATES" />
        </Reveal>

        <div className="space-y-3">
          {upcoming.map((concert, i) => {
            const d = new Date(concert.date);
            const day = d.toLocaleDateString("fr-FR", { day: "2-digit" });
            const mon = d
              .toLocaleDateString("fr-FR", { month: "short" })
              .replace(".", "")
              .toUpperCase();
            const yr = d.getFullYear();

            return (
              <Reveal key={concert.id} delay={i * 0.1}>
                <div
                  onClick={() => goToMap(concert.id)}
                  className="group flex items-center gap-5 sm:gap-8 border border-white/[0.06] hover:border-neon-red/35 px-5 sm:px-8 py-5 transition-all duration-300 hover:bg-neon-red/[0.025] cursor-pointer select-none"
                >
                  {/* Date chiffrée */}
                  <div className="text-center min-w-[52px]">
                    <p
                      className="font-condensed text-[2.8rem] text-neon-red leading-none"
                      style={{ textShadow: "0 0 12px rgba(255,36,66,0.35)" }}
                    >
                      {day}
                    </p>
                    <p className="font-condensed text-[0.7rem] tracking-widest text-cream/40">
                      {mon}
                    </p>
                    <p className="font-condensed text-[0.65rem] text-cream/20">
                      {yr}
                    </p>
                  </div>

                  <div className="w-px h-10 bg-white/[0.08] hidden sm:block" />

                  {/* Ville + salle */}
                  <div className="flex-1 min-w-0">
                    <p className="font-condensed text-xl tracking-widest text-cream group-hover:text-neon-pink transition-colors duration-300 truncate">
                      {concert.city.toUpperCase()}
                    </p>
                    <p className="font-body text-sm text-cream/40 truncate">
                      {concert.venue}
                    </p>
                  </div>

                  {/* Badge */}
                  {concert.type === "free" ? (
                    <span className="font-condensed text-[0.7rem] tracking-[0.2em] text-neon-red/80 border border-neon-red/30 px-3 py-1.5 shrink-0">
                      ENTRÉE LIBRE
                    </span>
                  ) : (
                    <a
                      href={concert.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-condensed text-[0.7rem] tracking-[0.2em] bg-neon-red text-motel-black px-3 py-1.5 hover:bg-neon-pink transition-colors duration-200 shrink-0"
                    >
                      TICKETS
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.35}>
          <div className="mt-10 text-center">
            <Link
              to="/dates"
              className="font-condensed text-sm tracking-[0.3em] text-neon-red hover:text-neon-pink transition-colors duration-200 border-b border-neon-red/30 hover:border-neon-pink/50 pb-0.5"
            >
              VOIR TOUTES LES DATES →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE HOME
// ════════════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <>
      <Hero />
      <BookingSection />
      <MembersSection />
      <InfluencesSection />
      <DatesPreview />
    </>
  );
}
