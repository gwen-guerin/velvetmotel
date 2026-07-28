// ─────────────────────────────────────────────────────────────────────────────
// GALERIE PHOTOS — plus rien à éditer ici.
// Toutes les images déposées dans /public/assets/gallery/ sont candidates.
// Pour ajouter une photo : glissez le fichier dans ce dossier, c'est tout.
// (formats web uniquement : jpg, jpeg, png, webp, avif, gif — pas de HEIC)
// ─────────────────────────────────────────────────────────────────────────────

// Liste générée au build par le plugin 'velvet-gallery' (voir vite.config.js).
import { galleryUrls } from "virtual:gallery";

export const GALLERY_SIZE = 25;

// Fisher-Yates, sur une copie pour ne pas muter la liste importée.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tire `count` photos au hasard, dans un ordre aléatoire.
// Appelé à chaque montage de la galerie → nouvelle sélection à chaque visite.
export function getRandomPhotos(count = GALLERY_SIZE) {
  return shuffle(galleryUrls)
    .slice(0, count)
    .map((url) => ({ id: url, url, alt: "Velvet Motel" }));
}
