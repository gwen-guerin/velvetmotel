// ─────────────────────────────────────────────────────────────────────────────
// DATES DE CONCERT — ajoutez, modifiez ou supprimez des entrées dans ce tableau.
//
// Champs :
//   date      : "YYYY-MM-DD"
//   city      : ville
//   venue     : nom de la salle
//   type      : "free" (Entrée libre) | "ticketed" (Billetterie)
//   ticketUrl : URL de billetterie (uniquement si type === "ticketed")
//   lat / lng : coordonnées GPS pour la carte (optionnel, dates à venir uniquement)
//
// La page trie automatiquement passées / à venir selon la date du jour.
// Pour afficher le message "Aucune date", laissez le tableau vide : []
// ─────────────────────────────────────────────────────────────────────────────

export const dates = [
  // ── À VENIR ────────────────────────────────────────────────────────────────
  {
    id: 1,
    date: "2026-06-06",
    city: "Thusy (74) - 11H30",
    venue: "Rassemblement de véhicules anciens",
    type: "free",
    lat: 45.947,
    lng: 5.9491,
  },
  {
    id: 2,
    date: "2026-06-19",
    city: "Poisy (74) - 20H30",
    venue: "Fête de la musique",
    type: "free",
    lat: 45.9218,
    lng: 6.0641,
  },
  {
    id: 3,
    date: "2026-06-21",
    city: "Groisy (74) - 22H30",
    venue: "Fête de la musique",
    type: "free",
    lat: 46.0165,
    lng: 6.1709,
  },
  {
    id: 4,
    date: "2026-06-26",
    city: "Thusy (74)",
    venue: "Fête de la musique",
    type: "free",
    lat: 45.947,
    lng: 5.9491,
  },

  // ── PASSÉES — remplacez par vos vraies dates ────────────────────────────────
  {
    id: 101,
    date: "2026-03-18",
    city: "Annecy (74)",
    venue: "Le Brise Glace",
    type: "free",
  },
];
