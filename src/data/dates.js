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
  {
    id: 14,
    date: "2026-11-12",
    time: "19H45",
    city: "L'Ecrevis - Meythet",
    venue: "Le concert du Bar Asso",
    type: "free",
    lat: 45.918779,
    lng: 6.098267,
  },
  {
    id: 15,
    date: "2026-12-22",
    time: "20H00",
    city: "Château de Menthon-Saint-Bernard",
    venue: "Marché de Noël",
    type: "free",
    lat: 45.858372,
    lng: 6.205403,
  },

  // ── PASSÉES — remplacez par vos vraies dates ────────────────────────────────
  {
    id: 101,
    date: "2026-03-18",
    city: "Annecy (74)",
    venue: "Le Brise Glace",
    type: "free",
  },
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
  {
    id: 11,
    date: "2026-08-01",
    time: "18H00",
    city: "Les Halles du Haras - Annecy",
    venue: "Fête du Lac",
    type: "free",
    lat: 45.9047,
    lng: 6.127,
  },
  {
    id: 8,
    date: "2026-08-23",
    time: "18H00",
    city: "Guinguette du lac - Annecy",
    venue: "Rock à la Piscine #2",
    type: "free",
    lat: 45.905,
    lng: 6.147,
  },
  {
    id: 9,
    date: "2026-09-05",
    time: "18H30",
    city: "Salle Pierre Lamy - Annecy",
    venue: "Festival Coup de Théâtre",
    type: "free",
    lat: 45.899519,
    lng: 6.123661,
  },
  {
    id: 10,
    date: "2026-09-20",
    time: "18H00",
    city: "Guinguette du lac - Annecy",
    venue: "Rock à la Piscine #3",
    type: "free",
    lat: 45.905,
    lng: 6.147,
  },
  {
    id: 12,
    date: "2026-09-19",
    time: "23H00",
    city: "La Coloc Pub - Annecy",
    venue: "La Coloc Flash Tattoo",
    type: "free",
    lat: 45.902064,
    lng: 45.902064,
  },
  {
    id: 13,
    date: "2026-31-10",
    time: "20H00",
    city: "V and B - Scionzier",
    venue: "SOIRÉE HALLOWEEN",
    type: "free",
    lat: 46.070088,
    lng: 6.551507,
  },
];
