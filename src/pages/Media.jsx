import { motion } from "framer-motion";
import { videos } from "../data/videos";
import { photos } from "../data/photos";

// ─── Helper reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── En-tête de section ───────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mb-16 text-center">
      <p className="font-condensed text-xs tracking-[0.45em] text-neon-red/50 mb-2">
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
// SECTION VIDÉOS
// Éditez src/data/videos.js pour changer les IDs YouTube et les titres.
// ════════════════════════════════════════════════════════════════════════════
function VideoCard({ video, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="group">
        {/* Player YouTube — aspect 16:9 */}
        <div className="relative aspect-video overflow-hidden border border-white/[0.06] group-hover:border-neon-red/30 transition-colors duration-300">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Titre + ligne hover */}
        <div className="mt-3">
          <p className="font-condensed text-base tracking-wider text-cream/60 group-hover:text-cream/90 transition-colors duration-200 leading-tight">
            {video.title}
          </p>
          <div className="mt-1.5 h-px w-0 group-hover:w-full bg-neon-red/40 transition-all duration-500 ease-out" />
        </div>
      </div>
    </Reveal>
  );
}

function VideosSection() {
  return (
    <section className="py-24 px-6 bg-motel-black">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Watch" title="VIDÉOS" />
        </Reveal>

        {/* Grid : 1 col → 2 → 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SECTION PHOTOS
// Éditez src/data/photos.js pour ajouter vos vraies photos.
// La grille masonry est obtenue via la propriété CSS `columns` native.
// ════════════════════════════════════════════════════════════════════════════
function PhotoItem({ photo, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden break-inside-avoid mb-4"
    >
      <img
        src={photo.url}
        alt={photo.alt}
        className="w-full h-auto block object-cover transition-transform duration-600 group-hover:scale-[1.04]"
        loading="lazy"
      />
      {/* Overlay rouge semi-transparent au hover */}
      <div className="absolute inset-0 bg-neon-red/0 group-hover:bg-neon-red/[0.18] transition-all duration-400" />
      {/* Lueur interne sur les bords */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: "inset 0 0 24px rgba(255,36,66,0.25)" }}
      />
    </motion.div>
  );
}

function PhotosSection() {
  return (
    <section className="py-24 px-6 bg-motel-dark">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Gallery" title="PHOTOS" />
        </Reveal>

        {/* Masonry CSS natif — 1 → 2 → 3 colonnes */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {photos.map((photo, i) => (
            <PhotoItem key={photo.id} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE MÉDIAS
// ════════════════════════════════════════════════════════════════════════════
export default function Media() {
  return (
    <>
      {/* En-tête de page */}
      {/* <div className="pt-36 pb-8 px-6 text-center">
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
            MÉDIAS
          </h1>
          <div className="mt-5 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-neon-red/70 to-transparent" />
        </motion.div>
      </div> */}

      <VideosSection />
      <PhotosSection />
    </>
  );
}
