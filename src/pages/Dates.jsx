import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dates } from "../data/dates";

// ─── Helper reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Date à venir ─────────────────────────────────────────────────────────────
function UpcomingItem({ concert, index, isActive, onClick }) {
  const d = new Date(concert.date);
  const day = d.toLocaleDateString("fr-FR", { day: "2-digit" });
  const month = d.toLocaleDateString("fr-FR", { month: "long" });
  const year = d.getFullYear();
  const weekday = d.toLocaleDateString("fr-FR", { weekday: "long" });

  return (
    <Reveal delay={index * 0.09}>
      <div
        onClick={onClick}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border-b border-white/[0.06] py-10 px-2 hover:px-4 transition-all duration-300 cursor-pointer select-none"
        style={
          isActive
            ? { paddingLeft: "1rem", borderColor: "rgba(255,36,66,0.25)" }
            : {}
        }
      >
        {/* Chiffre géant */}
        <div className="flex items-end gap-3 min-w-[180px]">
          <span
            className="font-condensed leading-none text-neon-red"
            style={{
              fontSize: "clamp(4.5rem, 10vw, 7rem)",
              textShadow: "0 0 18px rgba(255,36,66,0.35)",
            }}
          >
            {day}
          </span>
          <div className="pb-1">
            <p className="font-condensed text-xl tracking-wider text-cream/60 capitalize leading-tight">
              {month}
            </p>
            <p className="font-condensed text-base tracking-wider text-cream/25">
              {year}
            </p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-14 bg-white/[0.08] shrink-0" />

        <div className="flex-1 min-w-0">
          <p
            className="font-condensed tracking-widest text-cream group-hover:text-neon-pink transition-colors duration-300 truncate"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              color: isActive ? "var(--neon-pink)" : undefined,
            }}
          >
            {concert.city.toUpperCase()}
          </p>
          <p className="font-body text-base text-cream/45 mt-0.5 truncate">
            {concert.venue}
          </p>
          <p className="font-condensed text-xs tracking-[0.3em] text-cream/20 mt-1 capitalize">
            {weekday}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {concert.lat != null && (
            <span className="font-condensed text-[10px] tracking-[0.2em] text-cream/20 group-hover:text-neon-red/50 transition-colors duration-300">
              ↓ CARTE
            </span>
          )}
          {concert.type === "free" ? (
            <span
              className="inline-block font-condensed text-xs tracking-[0.25em] text-neon-red border border-neon-red/45 px-4 py-2"
              style={{ textShadow: "0 0 6px rgba(255,36,66,0.35)" }}
            >
              ENTRÉE LIBRE
            </span>
          ) : (
            <a
              href={concert.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block font-condensed text-xs tracking-[0.25em] bg-neon-red text-motel-black px-4 py-2 hover:bg-neon-pink transition-colors duration-200"
            >
              TICKETS →
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Date passée ──────────────────────────────────────────────────────────────
function PastItem({ concert, index }) {
  const d = new Date(concert.date);
  const day = d.toLocaleDateString("fr-FR", { day: "2-digit" });
  const month = d.toLocaleDateString("fr-FR", { month: "long" });
  const year = d.getFullYear();
  const weekday = d.toLocaleDateString("fr-FR", { weekday: "long" });

  return (
    <Reveal delay={index * 0.07}>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border-b border-white/[0.03] py-6 px-2 select-none"
        style={{ opacity: 0.42 }}
      >
        {/* Chiffre — plus petit, sans couleur néon */}
        <div className="flex items-end gap-3 min-w-[180px]">
          <span
            className="font-condensed leading-none text-cream/50"
            style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
          >
            {day}
          </span>
          <div className="pb-1">
            <p className="font-condensed text-base tracking-wider text-cream/50 capitalize leading-tight">
              {month}
            </p>
            <p className="font-condensed text-sm tracking-wider text-cream/40">
              {year}
            </p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-white/[0.05] shrink-0" />

        <div className="flex-1 min-w-0">
          <p
            className="font-condensed tracking-widest text-cream/50 truncate"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.7rem)" }}
          >
            {concert.city.toUpperCase()}
          </p>
          <p className="font-body text-sm text-cream/45 mt-0.5 truncate">
            {concert.venue}
          </p>
          <p className="font-condensed text-xs tracking-[0.3em] text-cream/35 mt-1 capitalize">
            {weekday}
          </p>
        </div>

        <span className="shrink-0 font-condensed text-[10px] tracking-[0.3em] text-cream/25 border border-white/10 px-3 py-1.5">
          PASSÉ
        </span>
      </div>
    </Reveal>
  );
}

// ─── État vide ────────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      className="text-center py-28"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span
        className="font-script block text-5xl text-neon-pink/40"
        style={{ textShadow: "0 0 24px rgba(255,107,138,0.15)" }}
      >
        Stay tuned
      </span>
      <p className="font-condensed text-lg tracking-[0.4em] text-cream/20 mt-5">
        AUCUNE DATE POUR LE MOMENT
      </p>
      <div className="mt-8 h-px w-12 mx-auto bg-neon-red/15" />
    </motion.div>
  );
}

// ─── Séparateur de section ────────────────────────────────────────────────────
function SectionDivider({ label }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mt-16 mb-2">
        <div className="h-px flex-1 bg-white/[0.04]" />
        <p className="font-condensed text-[10px] tracking-[0.45em] text-cream/20">
          {label}
        </p>
        <div className="h-px flex-1 bg-white/[0.04]" />
      </div>
    </Reveal>
  );
}

// ─── Contrôleur de vol de la carte ────────────────────────────────────────────
function MapFlyTo({ center }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    map.flyTo(center, 13, { duration: 0.8 });
  }, [center, map]);
  return null;
}

// ─── Carte des dates (uniquement dates à venir) ───────────────────────────────
function makeMarkerIcon(isNext) {
  const size = isNext ? 22 : 14;
  const color = isNext ? "#ff2442" : "#ff6b8a";
  const cls = isNext ? "vm-marker-next" : "";

  return L.divIcon({
    html: `<div class="${cls}" style="
      width:${size}px;
      height:${size}px;
      background:${color};
      border-radius:50%;
      border:2px solid rgba(255,255,255,${isNext ? 0.45 : 0.2});
      box-shadow:0 0 ${isNext ? 14 : 7}px ${isNext ? 3 : 1}px ${color}88;
    "></div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
  });
}

function DatesMap({ upcoming, selection, markerRefs }) {
  const today = new Date();
  const mappable = upcoming.filter((c) => c.lat != null && c.lng != null);
  if (mappable.length === 0) return null;

  const sorted = [...mappable].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const next = sorted.find((c) => new Date(c.date) >= today) ?? sorted[0];

  const activeItem = selection
    ? mappable.find((c) => c.id === selection.id)
    : null;
  const flyCenter = activeItem ? [activeItem.lat, activeItem.lng] : null;

  useEffect(() => {
    if (!selection) return;
    const timer = setTimeout(() => {
      markerRefs.current[selection.id]?.openPopup();
    }, 900);
    return () => clearTimeout(timer);
  }, [selection, markerRefs]);

  return (
    <Reveal>
      <div className="mt-12 mb-0">
        <div className="max-w-4xl mx-auto px-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <p className="font-condensed text-xs tracking-[0.4em] text-cream/30">
              SUR LA CARTE
            </p>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
        </div>

        <div style={{ height: "420px" }} className="w-full">
          <MapContainer
            center={[next.lat, next.lng]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <MapFlyTo center={flyCenter} />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={19}
            />
            {mappable.map((c) => (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                icon={makeMarkerIcon(c.id === next.id)}
                ref={(el) => {
                  if (el) markerRefs.current[c.id] = el;
                }}
              >
                <Popup minWidth={210}>
                  <p className="vm-popup-city">{c.city.toUpperCase()}</p>
                  <p className="vm-popup-venue">{c.venue}</p>
                  <p className="vm-popup-date">
                    {new Date(c.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vm-popup-btn"
                  >
                    OUVRIR DANS GOOGLE MAPS →
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </Reveal>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE DATES
// ════════════════════════════════════════════════════════════════════════════
export default function Dates() {
  const location = useLocation();
  const incomingId = useRef(location.state?.activeId ?? null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = dates
    .filter((c) => new Date(c.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const past = dates
    .filter((c) => new Date(c.date) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // plus récent en premier

  const [selection, setSelection] = useState(
    incomingId.current ? { id: incomingId.current, t: Date.now() } : null,
  );
  const mapSectionRef = useRef(null);
  const markerRefs = useRef({});

  useEffect(() => {
    if (!incomingId.current) return;
    const timer = setTimeout(() => {
      mapSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  function handleDateClick(id) {
    setSelection({ id, t: Date.now() });
    setTimeout(() => {
      mapSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }

  return (
    <>
      {/* En-tête */}
      <div className="pt-36 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-condensed text-xs tracking-[0.45em] text-neon-red/50 mb-2">
            VELVET MOTEL
          </p>
          <h1
            className="font-condensed tracking-widest text-cream leading-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            DATES
          </h1>
          <div className="mt-5 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-neon-red/70 to-transparent" />
        </motion.div>
      </div>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        {/* ── Dates à venir ── */}
        {upcoming.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {upcoming.map((concert, i) => (
              <UpcomingItem
                key={concert.id}
                concert={concert}
                index={i}
                isActive={selection?.id === concert.id}
                onClick={() => handleDateClick(concert.id)}
              />
            ))}
          </div>
        )}

        {/* ── Dates passées ── */}
        {past.length > 0 && (
          <>
            <SectionDivider label="PASSÉES" />
            <div>
              {past.map((concert, i) => (
                <PastItem key={concert.id} concert={concert} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Carte — uniquement dates à venir */}
      {upcoming.length > 0 && (
        <section ref={mapSectionRef} className="pb-28">
          <DatesMap
            upcoming={upcoming}
            selection={selection}
            markerRefs={markerRefs}
          />
        </section>
      )}
    </>
  );
}
