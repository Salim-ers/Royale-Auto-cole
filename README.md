# Royale Auto-école : site vitrine

Site React (Vite) de Royale Auto-école, 357 route de Paris, 60600 Breuil-le-Vert.

## Démarrer

```bash
npm install
npm run dev      # développement : http://localhost:5173
npm run build    # production : génère le dossier dist/
npm run preview  # tester le build
```

`npm run build` produit un site statique prêt à héberger (Netlify, Vercel, OVH, o2switch…).
Chaque page est pré-rendue avec son titre, sa description, ses balises Open Graph et les
données structurées. Le build génère aussi `sitemap.xml`, `robots.txt` et `404.html`.

## Modifier le contenu

Tout le contenu éditable est dans `src/data/` :

| Fichier | Contenu |
| --- | --- |
| `site.js` | Coordonnées, horaires, réseaux sociaux, chiffres du compteur, équipe, avis, histoire, valeurs, mentions légales, photos |
| `formations.js` | Formations, déroulement, tarifs |
| `articles.js` | Articles de la page Conseils (structure prête pour un CMS) |
| `reglementation.js` | Checklist des documents et accordéons de réglementation |
| `securite.js` | Panneaux, questions du quiz, réflexes |
| `seo.js` | Titres et descriptions des pages |

## À compléter avant la mise en ligne

Dans `src/data/site.js` :

- [ ] `url` : le nom de domaine définitif (canonical, sitemap, Open Graph)
- [ ] `email`
- [ ] liens Facebook et TikTok dans `socials`
- [ ] horaires du samedi : 12 h – 17 h (Vroomvroom) ou 14 h – 17 h (Google) ?
- [ ] `company` : capital, RCS, numéro d'agrément préfectoral, directeur de publication, hébergeur
- [ ] `team` : présentation et photos de l'équipe
- [ ] `reviews` : remplacer les avis marqués `example: true` par de vrais avis
- [ ] `stats` : ajouter le taux de réussite si vous souhaitez l'afficher
- [ ] `formEndpoint` : service de réception du formulaire (Formspree, Getform…). Vide = mode démo
- [ ] photos dans `public/images/` (voir le fichier LISEZ-MOI.txt du dossier)

## Structure

```
src/
  App.jsx               routes et gabarit
  main.jsx              point d'entrée navigateur
  entry-server.jsx      pré-rendu des pages (SEO)
  preview.jsx           aperçu autonome en un seul fichier
  lib/router.jsx        routeur léger, URLs propres, transitions de page
  lib/hooks.js          animations au scroll, compteurs, horaires, SEO
  components/           logo, voiture, panneaux, illustrations, navigation…
  pages/                les pages du site
  styles/global.css     système visuel complet
scripts/prerender.mjs   génération HTML par page, sitemap, robots
```

## Accessibilité et performance

- Navigation clavier, lien d'évitement, focus visible, libellés ARIA
- Respect de `prefers-reduced-motion` : animations désactivées
- Polices auto-hébergées (pas d'appel à Google Fonts)
- Carte Google Maps chargée uniquement sur action de l'utilisateur
- Aucun cookie de mesure d'audience par défaut

Les informations réglementaires ont été vérifiées en septembre 2026 sur
service-public.gouv.fr et France Titres (ANTS). À relire périodiquement.
