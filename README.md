# Velvet Motel — Site vitrine

Site vitrine pour le groupe de rock alternatif **Velvet Motel**.  
Stack : React 18 + Vite + React Router v6 + Framer Motion + Tailwind CSS v3.

---

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site est accessible sur **http://localhost:5173**

---

## Comment personnaliser le contenu

Tous les contenus éditables sont dans **`src/data/`**. Aucun besoin de toucher aux composants ou au style.

### 1. Contact & Instagram — `src/data/config.js`

```js
export const config = {
  instagramUrl:    'https://www.instagram.com/VOTRE_HANDLE',
  instagramHandle: '@VOTRE_HANDLE',
  email:           'votre@email.fr',
}
```

### 2. Membres — `src/data/members.js`

Modifiez `name`, `instrument`, `description`.  
Pour la photo, deux options :
- **Photo externe** : remplacez l'URL picsum par n'importe quelle URL HTTPS
- **Photo locale** : placez le fichier dans `public/photos/` et utilisez `'/photos/gwen.jpg'`

### 3. Dates de concert — `src/data/dates.js`

```js
{
  id:        1,                          // identifiant unique
  date:      '2026-05-17',              // format YYYY-MM-DD
  city:      'Paris',
  venue:     'La Maroquinerie',
  type:      'ticketed',                // 'free' ou 'ticketed'
  ticketUrl: 'https://...',             // uniquement si type === 'ticketed'
}
```

Pour afficher "Aucune date pour le moment", laissez le tableau **vide** : `export const dates = []`

### 4. Vidéos YouTube — `src/data/videos.js`

Trouvez l'ID dans l'URL YouTube : `https://www.youtube.com/watch?v=`**`CECI_EST_L_ID`**

```js
{ id: 1, youtubeId: 'CECI_EST_L_ID', title: 'Titre de la vidéo' }
```

### 5. Galerie photos — `src/data/photos.js`

Même logique que pour les membres : URL externe ou fichier dans `public/photos/`.

---

## Votre logo

Le fichier `fullblackcontour.jpg` à la racine du projet peut être utilisé dans la section Hero.  
Pour l'activer, dans `src/pages/Home.jsx`, section `Hero`, remplacez le logo texte par :

```jsx
<img
  src="/fullblackcontour.jpg"
  alt="Velvet Motel"
  className="w-auto max-h-[50vh] animate-flicker"
/>
```

Pour qu'il soit servi correctement par Vite, déplacez d'abord le fichier dans le dossier `public/`.

---

## Build de production

```bash
npm run build   # génère le dossier dist/
npm run preview # prévisualise le build
```

Le dossier `dist/` peut être déployé sur Netlify, Vercel, GitHub Pages, ou n'importe quel hébergeur statique.

---

## Structure des fichiers

```
src/
├── data/          ← CONTENU ÉDITABLE — commencez ici
│   ├── config.js  ← Instagram + email
│   ├── members.js ← 4 membres
│   ├── dates.js   ← concerts
│   ├── videos.js  ← IDs YouTube
│   └── photos.js  ← galerie
├── components/    ← Navbar, Footer, PageTransition
├── pages/         ← Home, Media, Dates
├── App.jsx        ← routes
├── main.jsx       ← point d'entrée
└── index.css      ← styles globaux, grain, néon
```
