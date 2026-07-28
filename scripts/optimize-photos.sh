#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Optimise les photos de public/assets/gallery/ pour le web.
#
#   npm run optimize-photos              # traite les nouvelles photos
#   npm run optimize-photos -- --dry-run # montre ce qui serait fait
#   npm run optimize-photos -- --force   # retraite tout, même le déjà optimisé
#
# Ce qu'il fait :
#   - redimensionne à 1600px sur le plus grand côté (JPEG qualité 80)
#   - convertit les HEIC (invisibles hors Safari) en jpg
#   - convertit les PNG en jpg, ou en WebP lossless s'ils ont de la transparence
#   - sauvegarde chaque original dans .originals-photos/ avant de toucher au
#     fichier (dossier gitignoré, supprimable une fois que tout est vérifié)
#
# Les photos déjà traitées sont mémorisées dans .photo-optimized : une deuxième
# exécution ne les recompresse pas (une recompression répétée dégrade l'image).
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GALLERY="$ROOT/public/assets/gallery"
BACKUP="$ROOT/.originals-photos"
MANIFEST="$ROOT/.photo-optimized"
TMP="${TMPDIR:-/tmp}/optimize-photos.$$"

MAX=1600
QUALITY=80
DRY=0
FORCE=0

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY=1 ;;
    --force)   FORCE=1 ;;
    --max)     MAX="${2:?--max attend une valeur}"; shift ;;
    --quality) QUALITY="${2:?--quality attend une valeur}"; shift ;;
    -h|--help) sed -n '2,18p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Option inconnue : $1 (voir --help)" >&2; exit 2 ;;
  esac
  shift
done

command -v sips >/dev/null || { echo "sips introuvable (macOS requis)." >&2; exit 1; }
[ -d "$GALLERY" ] || { echo "Dossier introuvable : $GALLERY" >&2; exit 1; }

HAS_CWEBP=0
command -v cwebp >/dev/null && HAS_CWEBP=1

mkdir -p "$BACKUP"
touch "$MANIFEST"
trap 'rm -f "$TMP".*' EXIT

size_of()  { stat -f%z "$1"; }
kb()       { echo $(( $1 / 1024 )); }
dims_of()  { sips -g pixelWidth -g pixelHeight "$1" 2>/dev/null \
             | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w" "h}'; }
has_alpha() { [ "$(sips -g hasAlpha "$1" 2>/dev/null | awk '/hasAlpha/{print $2}')" = "yes" ]; }
# .jpeg et .jpg sont le même format : sans ça, une photo déjà optimisée nommée
# .jpeg serait « convertie » en .jpg à chaque passage et échapperait au
# garde-fou qui refuse les résultats plus lourds que l'original.
norm_ext() { case "$1" in jpeg) echo jpg ;; *) echo "$1" ;; esac; }

# Déjà traité ? On compare nom + taille : une photo remplacée par une autre
# version du même nom sera bien retraitée.
already_done() {
  [ "$FORCE" -eq 1 ] && return 1
  grep -Fxq "$(size_of "$1")	$(basename "$1")" "$MANIFEST"
}

backup() {
  local f="$1" name; name="$(basename "$f")"
  [ -e "$BACKUP/$name" ] || cp "$f" "$BACKUP/$name"
}

# Ne sont marquées « optimisées » que les photos réellement traitées (ou déjà
# connues du manifeste). Une photo qu'on n'a pas su traiter — format exotique,
# fichier illisible, cwebp manquant — reste hors manifeste et sera retentée au
# prochain passage, au lieu d'être considérée à tort comme faite.
DONE="$TMP.done"
: > "$DONE"
record_done() { printf '%s\n' "$1" >> "$DONE"; }

total_before=0
total_after=0
n_done=0
n_skip=0

for f in "$GALLERY"/*; do
  [ -f "$f" ] || continue
  name="$(basename "$f")"
  base="${name%.*}"
  ext="$(echo "${name##*.}" | tr '[:upper:]' '[:lower:]')"

  case "$ext" in
    jpg|jpeg|png|heic|webp|gif|avif) ;;
    *) echo "  ignoré   $name (pas une image)"; continue ;;
  esac

  if already_done "$f"; then
    record_done "$name"
    n_skip=$((n_skip + 1))
    continue
  fi

  before="$(size_of "$f")"
  read -r w h <<<"$(dims_of "$f")"
  [ -n "${w:-}" ] || { echo "  ILLISIBLE $name"; continue; }

  # Cible de sortie : jpg par défaut, WebP lossless si transparence à préserver.
  out_ext="jpg"
  mode="jpeg"
  if { [ "$ext" = "png" ] || [ "$ext" = "webp" ] || [ "$ext" = "gif" ]; } && has_alpha "$f"; then
    if [ "$HAS_CWEBP" -eq 1 ]; then
      out_ext="webp"; mode="webp"
    else
      echo "  ignoré   $name (transparence, et cwebp absent : brew install webp)"
      continue
    fi
  fi

  if [ "$DRY" -eq 1 ]; then
    printf '  à faire  %-42s %5s KB  %sx%s -> %s\n' "$name" "$(kb "$before")" "$w" "$h" "$out_ext"
    n_done=$((n_done + 1))
    total_before=$((total_before + before))
    continue
  fi

  # `sips -Z` agrandit les images plus petites que la cible : on ne redimensionne
  # que vers le bas, jamais vers le haut.
  needs_resize=0
  if [ "$w" -gt "$MAX" ] || [ "$h" -gt "$MAX" ]; then needs_resize=1; fi

  tmp="$TMP.$out_ext"
  if [ "$mode" = "webp" ]; then
    # -resize L 0 / 0 L : cwebp complète la dimension manquante en gardant le ratio.
    resize=()
    if [ "$needs_resize" -eq 1 ]; then
      if [ "$w" -ge "$h" ]; then resize=(-resize "$MAX" 0); else resize=(-resize 0 "$MAX"); fi
    fi
    # ${x[@]+"${x[@]}"} : le bash 3.2 de macOS échoue sur un tableau vide sous `set -u`.
    cwebp -quiet -lossless -z 9 ${resize[@]+"${resize[@]}"} "$f" -o "$tmp" 2>/dev/null
  elif [ "$needs_resize" -eq 1 ]; then
    sips -Z "$MAX" -s format jpeg -s formatOptions "$QUALITY" "$f" --out "$tmp" >/dev/null 2>&1
  else
    sips -s format jpeg -s formatOptions "$QUALITY" "$f" --out "$tmp" >/dev/null 2>&1
  fi

  if [ ! -s "$tmp" ]; then
    echo "  ÉCHEC    $name"
    continue
  fi

  after="$(size_of "$tmp")"

  # Si l'optimisation ne gagne rien et que le format ne change pas, on garde
  # l'original : inutile de le recompresser pour rien.
  if [ "$after" -ge "$before" ] && [ "$(norm_ext "$ext")" = "$out_ext" ]; then
    rm -f "$tmp"
    record_done "$name"
    printf '  gardé    %-42s %5s KB (déjà optimisé)\n' "$name" "$(kb "$before")"
    total_before=$((total_before + before))
    total_after=$((total_after + before))
    continue
  fi

  backup "$f"
  rm -f "$f"
  mv "$tmp" "$GALLERY/$base.$out_ext"

  record_done "$base.$out_ext"
  read -r nw nh <<<"$(dims_of "$GALLERY/$base.$out_ext")"
  printf '  ok       %-42s %5s KB -> %4s KB  (%sx%s)\n' \
    "$base.$out_ext" "$(kb "$before")" "$(kb "$after")" "$nw" "$nh"

  n_done=$((n_done + 1))
  total_before=$((total_before + before))
  total_after=$((total_after + after))
done

if [ "$DRY" -eq 1 ]; then
  echo
  echo "  → $n_done à traiter, $n_skip déjà optimisée(s). Rien n'a été modifié."
  exit 0
fi

# Manifeste reconstruit à partir des seules photos traitées ou déjà connues.
: > "$MANIFEST"
while IFS= read -r name; do
  [ -f "$GALLERY/$name" ] && printf '%s\t%s\n' "$(size_of "$GALLERY/$name")" "$name" >> "$MANIFEST"
done < "$DONE"

echo
if [ "$n_done" -eq 0 ]; then
  echo "  → Rien à faire, les $n_skip photos sont déjà optimisées."
else
  echo "  → $n_done photo(s) traitée(s), $n_skip déjà optimisée(s)."
  echo "    $(kb "$total_before") KB -> $(kb "$total_after") KB"
  echo "    Originaux conservés dans .originals-photos/"
fi
echo "  → Galerie : $(ls "$GALLERY" | wc -l | tr -d ' ') photos, $(du -sh "$GALLERY" | cut -f1)"
