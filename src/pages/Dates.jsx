import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { dates } from '../data/dates'

// ─── Helper reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Un concert ───────────────────────────────────────────────────────────────
function DateItem({ concert, index }) {
  const d       = new Date(concert.date)
  const day     = d.toLocaleDateString('fr-FR', { day:     '2-digit' })
  const month   = d.toLocaleDateString('fr-FR', { month:   'long'    })
  const year    = d.getFullYear()
  const weekday = d.toLocaleDateString('fr-FR', { weekday: 'long'    })

  return (
    <Reveal delay={index * 0.09}>
      <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border-b border-white/[0.06] py-10 px-2 hover:px-4 transition-all duration-300">

        {/* Bloc date — chiffre géant */}
        <div className="flex items-end gap-3 min-w-[180px]">
          <span
            className="font-condensed leading-none text-neon-red"
            style={{
              fontSize: 'clamp(4.5rem, 10vw, 7rem)',
              textShadow: '0 0 18px rgba(255,36,66,0.35)',
            }}
          >
            {day}
          </span>
          <div className="pb-1">
            <p className="font-condensed text-xl tracking-wider text-cream/60 capitalize leading-tight">
              {month}
            </p>
            <p className="font-condensed text-base tracking-wider text-cream/25">{year}</p>
          </div>
        </div>

        {/* Séparateur vertical */}
        <div className="hidden sm:block w-px h-14 bg-white/[0.08] shrink-0" />

        {/* Infos texte */}
        <div className="flex-1 min-w-0">
          <p
            className="font-condensed tracking-widest text-cream group-hover:text-neon-pink transition-colors duration-300 truncate"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
          >
            {concert.city.toUpperCase()}
          </p>
          <p className="font-body text-base text-cream/45 mt-0.5 truncate">{concert.venue}</p>
          <p className="font-condensed text-xs tracking-[0.3em] text-cream/20 mt-1 capitalize">
            {weekday}
          </p>
        </div>

        {/* Badge entrée / tickets */}
        <div className="shrink-0">
          {concert.type === 'free' ? (
            <span
              className="inline-block font-condensed text-xs tracking-[0.25em] text-neon-red border border-neon-red/45 px-4 py-2"
              style={{ textShadow: '0 0 6px rgba(255,36,66,0.35)' }}
            >
              ENTRÉE LIBRE
            </span>
          ) : (
            <a
              href={concert.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-condensed text-xs tracking-[0.25em] bg-neon-red text-motel-black px-4 py-2 hover:bg-neon-pink transition-colors duration-200"
            >
              TICKETS →
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
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
        style={{ textShadow: '0 0 24px rgba(255,107,138,0.15)' }}
      >
        Stay tuned
      </span>
      <p className="font-condensed text-lg tracking-[0.4em] text-cream/20 mt-5">
        AUCUNE DATE POUR LE MOMENT
      </p>
      <div className="mt-8 h-px w-12 mx-auto bg-neon-red/15" />
    </motion.div>
  )
}

// ─── Carte des dates ──────────────────────────────────────────────────────────
function makeMarkerIcon(isNext) {
  const size  = isNext ? 22 : 14
  const color = isNext ? '#ff2442' : '#ff6b8a'
  const cls   = isNext ? 'vm-marker-next' : ''

  return L.divIcon({
    html: `<div class="${cls}" style="
      width:${size}px;
      height:${size}px;
      background:${color};
      border-radius:50%;
      border:2px solid rgba(255,255,255,${isNext ? 0.45 : 0.2});
      box-shadow:0 0 ${isNext ? 14 : 7}px ${isNext ? 3 : 1}px ${color}88;
    "></div>`,
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
  })
}

function DatesMap({ concerts }) {
  const today    = new Date()
  const mappable = concerts.filter(c => c.lat != null && c.lng != null)
  if (mappable.length === 0) return null

  const sorted = [...mappable].sort((a, b) => new Date(a.date) - new Date(b.date))
  const next   = sorted.find(c => new Date(c.date) >= today) ?? sorted[0]

  return (
    <Reveal>
      <div className="mt-12 mb-0">
        {/* Titre section */}
        <div className="max-w-4xl mx-auto px-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <p className="font-condensed text-xs tracking-[0.4em] text-cream/30">SUR LA CARTE</p>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
        </div>

        {/* Carte */}
        <div style={{ height: '420px' }} className="w-full">
          <MapContainer
            center={[next.lat, next.lng]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={19}
            />
            {mappable.map(c => (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                icon={makeMarkerIcon(c.id === next.id)}
              >
                <Popup>
                  <p style={{ margin: '0 0 2px', fontFamily: 'inherit', fontWeight: 700, color: '#ff2442', fontSize: '13px', letterSpacing: '0.1em' }}>
                    {c.city.toUpperCase()}
                  </p>
                  <p style={{ margin: '0 0 2px', fontSize: '12px', color: 'rgba(240,230,211,0.6)' }}>
                    {c.venue}
                  </p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'rgba(240,230,211,0.35)' }}>
                    {new Date(c.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </Reveal>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE DATES
// Éditez src/data/dates.js pour gérer les concerts.
// ════════════════════════════════════════════════════════════════════════════
export default function Dates() {
  return (
    <>
      {/* En-tête de page */}
      <div className="pt-36 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-condensed text-xs tracking-[0.45em] text-neon-red/50 mb-2">VELVET MOTEL</p>
          <h1
            className="font-condensed tracking-widest text-cream leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
          >
            DATES
          </h1>
          <div className="mt-5 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-neon-red/70 to-transparent" />
        </motion.div>
      </div>

      {/* Liste ou état vide */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        {dates.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {dates.map((concert, i) => (
              <DateItem key={concert.id} concert={concert} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Carte */}
      {dates.length > 0 && (
        <section className="pb-28">
          <DatesMap concerts={dates} />
        </section>
      )}
    </>
  )
}
