// ─────────────────────────────────────────────────────────────────────────────
// DATES DE CONCERT — ajoutez, modifiez ou supprimez des entrées dans ce tableau.
//
// Champs :
//   date      : "YYYY-MM-DD"
//   city      : ville
//   venue     : nom de la salle
//   type      : "free" (Entrée libre) | "ticketed" (Billetterie)
//   ticketUrl : URL de billetterie (uniquement si type === "ticketed")
//
// Pour afficher le message "Aucune date", laissez le tableau vide : []
// ─────────────────────────────────────────────────────────────────────────────

export const dates = [
  {
    id: 1,
    date: "2026-06-06",
    city: "Thusy (74)",
    venue: "Rassemblement de véhicules anciens",
    type: "free",
  },
  {
    id: 2,
    date: "2026-06-19",
    city: "Poisy (74)",
    venue: "Fête de la musique",
    type: "free",
  },
  {
    id: 3,
    date: "2026-06-21",
    city: "Groisy (74)",
    venue: "Fête de la musique",
    type: "free",
  },
  {
    id: 4,
    date: "2026-06-26",
    city: "Thusy (74)",
    venue: "Fête de la musique",
    type: "free",
  },
];
