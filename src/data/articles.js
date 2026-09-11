/* ==========================================================================
   CONSEILS & ACTUALITÉS
   Structure prête pour un CMS : chaque article = un objet.
   Blocs de contenu : { p }, { h2 }, { list: [] }, { tip, link? }
   ========================================================================== */

export const ARTICLE_CATEGORIES = ['Examen', 'Code', 'Conseils', 'Formations', 'Sécurité'];

export const ARTICLES = [
  {
    slug: '5-erreurs-a-eviter-le-jour-du-permis',
    title: '5 erreurs à éviter le jour du permis',
    category: 'Examen',
    date: '2026-09-08',
    readTime: 4,
    cover: 'examen',
    excerpt: 'Arrivée précipitée, angles morts oubliés, panique après une hésitation : les pièges classiques de l’examen pratique et la parade pour chacun.',
    content: [
      { p: 'Le jour de l’examen pratique, la plupart des erreurs ne viennent pas d’un manque de niveau, mais de petits réflexes qui sautent sous la pression. En voici cinq, avec la parade.' },
      { h2: '1. Arriver en courant' },
      { p: 'Prévoyez d’être là en avance, avec votre pièce d’identité. Quelques minutes pour respirer valent mieux qu’une installation précipitée au volant.' },
      { h2: '2. Bâcler l’installation' },
      { p: 'Siège, rétroviseurs, ceinture : l’inspecteur observe aussi la façon dont vous vous installez. Prenez le temps, c’est votre voiture pendant environ 32 minutes.' },
      { h2: '3. Oublier les angles morts' },
      { p: 'Changement de voie, sortie de stationnement, insertion : un regard par-dessus l’épaule, à chaque fois. C’est un réflexe de sécurité que l’inspecteur regarde de près.' },
      { h2: '4. Rouler trop lentement' },
      { p: 'Rouler nettement sous la vitesse autorisée sans raison peut gêner la circulation. Adaptez votre allure aux conditions, ni plus, ni moins.' },
      { h2: '5. Ruminer une erreur' },
      { p: 'Une hésitation n’est pas forcément éliminatoire. Restez concentré sur la suite du parcours plutôt que sur le dernier carrefour.' },
      { tip: 'Chez Royale, l’auto-école vous accompagne le jour de l’examen. Une question sur le déroulement ? Appelez-nous.', link: { to: '/contact', label: 'Nous contacter' } },
    ],
  },
  {
    slug: 'comment-reussir-son-code-de-la-route',
    title: 'Comment réussir son code de la route\u00a0?',
    category: 'Code',
    date: '2026-09-01',
    readTime: 5,
    cover: 'code',
    excerpt: '40 questions, 35 bonnes réponses : une méthode simple pour réviser efficacement et arriver serein au centre d’examen.',
    content: [
      { p: 'L’examen du code comporte 40 questions, et il faut au moins 35 bonnes réponses pour le réussir. Bonne nouvelle : c’est une épreuve qui se prépare avec méthode.' },
      { h2: 'Réviser un peu, mais souvent' },
      { p: 'Deux séries par jour valent mieux qu’une journée entière le week-end. La régularité ancre les règles et les automatismes.' },
      { h2: 'Analyser chaque erreur' },
      { p: 'Une série ratée est utile si vous comprenez pourquoi. Notez les thèmes qui reviennent : priorités, croisements, distances, vitesse.' },
      { h2: 'Lire la question jusqu’au bout' },
      { p: 'Beaucoup d’erreurs viennent d’un mot mal lu. Regardez toute l’image, rétroviseurs, panneaux et marquages compris, avant de répondre.' },
      { h2: 'Réserver au bon moment' },
      { p: 'Quand vos séries sont régulièrement au-dessus du seuil, parlez-en avec l’équipe pour choisir une date. Le code se passe en centre agréé, par exemple au centre La Poste de Breuil-le-Vert, route de Paris.' },
      { list: ['Passage de l’examen : 30 €.', 'Code réussi : valable 5 ans.', 'Résultat envoyé par e-mail.'] },
      { tip: 'Révisez aussi les panneaux de manière ludique sur notre page Sécurité routière.', link: { to: '/securite-routiere', label: 'Voir les panneaux' } },
    ],
  },
  {
    slug: 'gerer-son-stress-avant-l-examen',
    title: 'Bien gérer son stress avant l’examen',
    category: 'Conseils',
    date: '2026-08-25',
    readTime: 4,
    cover: 'stress',
    excerpt: 'Le trac est normal. Des techniques concrètes, la veille et le jour J, pour qu’il ne prenne pas le volant à votre place.',
    content: [
      { p: 'Avoir le trac avant l’examen est normal : c’est le signe que l’enjeu compte pour vous. L’objectif n’est pas de ne rien ressentir, mais de garder la main.' },
      { h2: 'La veille' },
      { list: ['Préparez vos documents et votre tenue pour ne rien chercher le matin.', 'Évitez de réviser tard : une bonne nuit vaut plus qu’une dernière série.', 'Visualisez le début : installation, départ, premiers carrefours.'] },
      { h2: 'Juste avant' },
      { p: 'Respirez lentement : inspirez sur quatre temps, expirez sur six, plusieurs fois. Ce rythme aide à ralentir et à retrouver de la concentration.' },
      { h2: 'Pendant l’épreuve' },
      { p: 'Parlez-vous intérieurement : rétro, clignotant, angle mort. Ces petites phrases ramènent l’attention sur l’action plutôt que sur l’inspecteur.' },
      { tip: 'Une leçon peu de temps avant l’examen aide à se remettre dans le bain. Demandez conseil à l’équipe pour la planifier.', link: { to: '/contact?sujet=permis-b', label: 'Planifier une leçon' } },
    ],
  },
  {
    slug: 'conduite-accompagnee-tout-comprendre',
    title: 'Conduite accompagnée : tout comprendre',
    category: 'Formations',
    date: '2026-08-18',
    readTime: 6,
    cover: 'aac',
    excerpt: 'Dès 15 ans, 3 000 km minimum et une période probatoire réduite : le fonctionnement de l’AAC expliqué simplement.',
    content: [
      { p: 'L’apprentissage anticipé de la conduite (AAC) permet de commencer dès 15 ans et d’accumuler de l’expérience avec un proche avant de passer le permis.' },
      { h2: 'Deux phases' },
      { list: ['Formation initiale en auto-école : code réussi et au moins 20 h de conduite, ou 13 h en boîte automatique.', 'Conduite accompagnée : au moins 1 an et 3 000 km avec votre accompagnateur, en France.'] },
      { h2: 'Les rendez-vous' },
      { p: 'Un rendez-vous préalable de 2 heures lance la conduite accompagnée. Ensuite, deux rendez-vous pédagogiques de 3 heures font le point : le premier 4 à 6 mois après la fin de la formation initiale, le second une fois 3 000 km parcourus.' },
      { h2: 'Les avantages' },
      { list: ['Examen pratique possible dès 17 ans.', 'Période probatoire de 2 ans au lieu de 3.', 'Une vraie expérience de la route : jour, nuit, pluie, autoroute.'] },
      { tip: 'Pendant l’AAC, la vitesse est limitée, notamment à 110 km/h sur les autoroutes à 130 et à 80 km/h sur les routes classiques.', link: { to: '/formations#conduite-accompagnee', label: 'Voir la formation AAC' } },
    ],
  },
  {
    slug: 'panneaux-a-connaitre-absolument',
    title: 'Les panneaux que vous devez absolument connaître',
    category: 'Sécurité',
    date: '2026-08-11',
    readTime: 3,
    cover: 'panneaux',
    excerpt: 'STOP, cédez le passage, route prioritaire : les formes et couleurs qui vous renseignent avant même de lire le panneau.',
    content: [
      { p: 'Un panneau se lit d’abord par sa forme et sa couleur. Les reconnaître d’un coup d’œil, c’est gagner du temps pour anticiper.' },
      { h2: 'Les formes à retenir' },
      { list: ['Triangle à bord rouge : danger.', 'Rond à bord rouge : interdiction.', 'Rond bleu : obligation.', 'Carré ou rectangle bleu : indication.', 'Octogone rouge : STOP.', 'Losange jaune : route prioritaire.'] },
      { h2: 'STOP ou cédez le passage\u00a0?' },
      { p: 'Au STOP, l’arrêt est obligatoire, même si la voie est libre. Au cédez le passage, vous ne vous arrêtez que si c’est nécessaire pour laisser passer.' },
      { h2: 'La priorité à droite' },
      { p: 'Sans panneau ni feu, la priorité à droite s’applique. Le triangle avec une croix noire vous l’annonce à l’avance.' },
      { tip: 'Entraînez-vous avec nos panneaux interactifs et le mini quiz.', link: { to: '/securite-routiere', label: 'Tester mes réflexes' } },
    ],
  },
];

export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}
