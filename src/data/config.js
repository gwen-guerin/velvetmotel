// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION GÉNÉRALE — éditez ce fichier pour mettre à jour les contacts.
// ─────────────────────────────────────────────────────────────────────────────

export const config = {
  // URL complète de votre page Instagram
  instagramUrl: "https://www.instagram.com/velvetmotel_off",
  // Handle affiché dans le footer
  instagramHandle: "@velvetmotel_off",
  // Email de contact
  email: "velvetmoteloff@gmail.com",
};

// ─────────────────────────────────────────────────────────────────────────────
// ENCART BOOKING — le texte de la section « ON JOUE CHEZ VOUS » sur l'accueil.
// Tout est éditable ici : le chapô, les 4 blocs d'infos et l'objet du mail.
// ─────────────────────────────────────────────────────────────────────────────

export const booking = {
  // Petit texte d'accroche sous le titre de section
  intro:
    "Quatre musiciens d'Annecy, un répertoire de reprises rock qui va de Nirvana aux Arctic Monkeys, et l'envie de le jouer fort et devant du monde. Bar, guinguette, fête de village ou festival : si vous cherchez un groupe pour remplir une soirée, on est là.",

  // Les 4 blocs d'infos. Ajoutez ou retirez des entrées librement.
  points: [
    {
      label: "Format",
      value: "45 min → 3 h",
      detail:
        "Un set court pour une première partie, ou la soirée complète en deux sets avec pause. On adapte la setlist au lieu et au public.",
    },
    {
      label: "Technique",
      value: "Quasi autonomes",
      detail:
        "On arrive avec nos instruments, nos amplis, nos retours et nos lumières. Pour la sono de façade et le praticable, on peut s'organiser si le lieu n'est pas équipé.",
    },
    {
      label: "Où",
      value: "Annecy & Haute-Savoie",
      detail:
        "Et jusqu'à 1 h 30 de route : Savoie, Ain, Grenoble. Au-delà, écrivez quand même, on en discute.",
    },
    {
      label: "Tarifs",
      value: "Sur demande",
      detail:
        "Ça dépend de la durée, du lieu et du matériel à prévoir. Dites-nous ce que vous organisez, on revient vers vous rapidement.",
    },
  ],

  // Objet pré-rempli du mail quand on clique sur « NOUS ÉCRIRE »
  mailSubject: "Demande de booking — Velvet Motel",
};
