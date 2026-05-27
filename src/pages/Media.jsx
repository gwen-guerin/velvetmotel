import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// ─── Bouton flèche ────────────────────────────────────────────────────────────
function ArrowBtn({ direction, onClick, disabled, bare = false }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.12 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      className={`transition-all duration-300 ${
        bare
          ? `p-2 ${disabled ? "text-white/15 cursor-default" : "text-neon-red/50 hover:text-neon-red"}`
          : `border rounded-full p-3 ${
              disabled
                ? "border-white/10 text-white/15 cursor-default"
                : "border-neon-red/40 text-neon-red/60 hover:border-neon-red/90 hover:text-neon-red hover:shadow-[0_0_14px_rgba(255,36,66,0.35)]"
            }`
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path
          d={direction === "left" ? "M13 4l-6 6 6 6" : "M7 4l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SECTION VIDÉOS — carousel horizontal par page de 3 (desktop) ou 1 (mobile)
// ════════════════════════════════════════════════════════════════════════════

// Pinned en premier, puis le reste
const sortedVideos = [
  ...videos.filter((v) => v.pinned),
  ...videos.filter((v) => !v.pinned),
];

function chunkVideos(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size)
    result.push(arr.slice(i, i + size));
  return result;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 640px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

function SwipeEdge({ side, onSwipeLeft, onSwipeRight }) {
  const startX = useRef(null);
  return (
    <div
      className={`absolute top-0 bottom-0 z-10 w-14 ${side === "left" ? "left-0" : "right-0"}`}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const delta = startX.current - e.changedTouches[0].clientX;
        startX.current = null;
        if (delta > 40) onSwipeLeft();
        else if (delta < -40) onSwipeRight();
      }}
    />
  );
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
};

function VideosSection() {
  const isDesktop = useIsDesktop();
  const perPage = isDesktop ? 3 : 1;
  const pages = chunkVideos(sortedVideos, perPage);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);

  // Reset page si on change de breakpoint et qu'on est hors limites
  useEffect(() => {
    setPage((p) => Math.min(p, pages.length - 1));
  }, [perPage, pages.length]);

  const goTo = (next) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (delta > 50 && page < pages.length - 1) goTo(page + 1);
    else if (delta < -50 && page > 0) goTo(page - 1);
  };

  const videoGrid = (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={page}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10"
      >
        {pages[page].map((video) => (
          <div key={video.id} className="group">
            <div className="relative aspect-video overflow-hidden border border-white/[0.06] group-hover:border-neon-red/30 transition-colors duration-300">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
              {!isDesktop && (
                <>
                  <SwipeEdge
                    side="left"
                    onSwipeLeft={() =>
                      page < pages.length - 1 && goTo(page + 1)
                    }
                    onSwipeRight={() => page > 0 && goTo(page - 1)}
                  />
                  <SwipeEdge
                    side="right"
                    onSwipeLeft={() =>
                      page < pages.length - 1 && goTo(page + 1)
                    }
                    onSwipeRight={() => page > 0 && goTo(page - 1)}
                  />
                </>
              )}
            </div>
            <div className="mt-3">
              <p className="font-condensed text-base tracking-wider text-cream/60 group-hover:text-cream/90 transition-colors duration-200 leading-tight">
                {video.title}
              </p>
              <div className="mt-1.5 h-px w-0 group-hover:w-full bg-neon-red/40 transition-all duration-500 ease-out" />
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );

  const indicators = pages.length > 1 && (
    <div className="flex justify-center gap-2 mt-10">
      {pages.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          className={`h-px transition-all duration-300 ${
            i === page ? "w-8 bg-neon-red" : "w-4 bg-white/20 hover:bg-white/40"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background crew.jpg désaturé et assombri */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/crew.jpg"
          alt="crew pic"
          aria-hidden="true"
          className="size-full object-cover object-center"
          style={{ filter: "saturate(0.8) brightness(0.25)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(17,17,17,0.55)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader eyebrow="Watch" title="VIDÉOS" />
        </Reveal>
      </div>

      {isDesktop ? (
        /* ── Desktop : flèches sur les côtés ── */
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <ArrowBtn
                direction="left"
                onClick={() => goTo(page - 1)}
                disabled={page === 0}
              />
            </div>
            <div className="flex-1 overflow-hidden">{videoGrid}</div>
            <div className="flex-shrink-0">
              <ArrowBtn
                direction="right"
                onClick={() => goTo(page + 1)}
                disabled={page === pages.length - 1}
              />
            </div>
          </div>
          {indicators}
        </div>
      ) : (
        /* ── Mobile : vidéo quasi pleine largeur, flèches en dessous ── */
        <div
          className="relative z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="px-3 overflow-hidden">{videoGrid}</div>
          <div className="flex items-center justify-center gap-10 mt-6 px-6">
            <ArrowBtn
              bare
              direction="left"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
            />
            {indicators}
            <ArrowBtn
              bare
              direction="right"
              onClick={() => goTo(page + 1)}
              disabled={page === pages.length - 1}
            />
          </div>
        </div>
      )}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SECTION PHOTOS
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
      <div className="absolute inset-0 bg-neon-red/0 group-hover:bg-neon-red/[0.18] transition-all duration-400" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: "inset 0 0 24px rgba(255,36,66,0.25)" }}
      />
    </motion.div>
  );
}

function PhotosSection() {
  return (
    <section className="py-12 sm:py-24 px-6 bg-motel-dark">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader eyebrow="Gallery" title="PHOTOS" />
        </Reveal>
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
      <VideosSection />
      <PhotosSection />
    </>
  );
}
