// ─────────────────────────────────────────────────────────────────────────────
// DATES DE CONCERT — ajoutez, modifiez ou supprimez des entrées dans ce tableau.
//
// Champs :
//   date      : "YYYY-MM-DD"
//   time      : "20H30" (optionnel — heure de passage sur scène)
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
    time: "11H30",
    city: "Thusy (74)",
    venue: "Rassemblement de véhicules anciens",
    type: "free",
    lat: 45.947,
    lng: 5.9491,
  },
  {
    id: 2,
    date: "2026-06-19",
    time: "20H30",
    city: "Poisy (74)",
    venue: "Fête de la musique",
    type: "free",
    lat: 45.9218,
    lng: 6.0641,
  },
  {
    id: 3,
    date: "2026-06-21",
    time: "22H30",
    city: "Groisy (74)",
    venue: "Fête de la musique",
    type: "free",
    lat: 46.0165,
    lng: 6.1709,
  },
  {
    id: 4,
    date: "2026-06-27",
    time: "20H00",
    city: "Thusy (74)",
    venue: "Fête de la musique",
    type: "free",
    lat: 45.947,
    lng: 5.9491,
  },
  {
    id: 5,
    date: "2026-07-10",
    time: "21H30",
    city: "Le Mazot Cosmique - Annecy (74)",
    type: "free",
    lat: 45.909067,
    lng: 6.1174,
  },
  {
    id: 6,
    date: "2026-07-05",
    time: "17H00",
    city: "Guinguette du lac - Annecy",
    venue: "Première - Rock",
    type: "free",
    lat: 45.905,
    lng: 6.147,
  },
  {
    id: 7,
    date: "2026-07-21",
    time: "19H00",
    city: "Ébo - Annecy",
    type: "free",
    lat: 45.90564,
    lng: 6.153316,
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
