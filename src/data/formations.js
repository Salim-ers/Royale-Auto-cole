/* ==========================================================================
   FORMATIONS
   Réglementation vérifiée sur service-public.gouv.fr (septembre 2026).
   Tarifs à l'unité : relevés sur la fiche Vroomvroom de l'auto-école.
   Forfaits non communiqués : « Sur devis ».
   ========================================================================== */

export const FORMATIONS = [
  {
    id: 'permis-b',
    area: 'b',
    illus: 'permisB',
    mark: 'B',
    title: 'Permis B',
    tag: 'Examen dès 17 ans',
    short: 'La formation complète : évaluation de départ, code, leçons de conduite en boîte manuelle ou automatique et accompagnement à l’examen.',
    intro: 'Votre permis voiture de A à Z, avec une équipe qui suit vos progrès à chaque leçon. Boîte manuelle ou automatique : on choisit ensemble ce qui vous convient.',
    audience: [
      'Vous passez votre premier permis voiture.',
      'Vous voulez apprendre en boîte manuelle ou en boîte automatique (B78).',
      'Vous aurez au moins 17 ans le jour de l’examen pratique.',
    ],
    steps: [
      { t: 'Évaluation de départ', d: 'Sur tablette, pour estimer le volume d’heures adapté à votre profil.' },
      { t: 'Code de la route', d: 'En agence ou en ligne, jusqu’à l’examen en centre agréé.' },
      { t: 'Leçons de conduite', d: 'Des leçons de 50 minutes, en semaine de 7 h à 21 h.' },
      { t: 'Examen pratique', d: 'Environ 32 minutes avec un inspecteur, accompagné par l’auto-école.' },
    ],
    facts: [
      { v: '20 h', l: 'de conduite minimum en boîte manuelle' },
      { v: '13 h', l: 'de conduite minimum en boîte automatique' },
      { v: '17 ans', l: 'âge minimum pour l’examen pratique' },
      { v: '5 ans', l: 'de validité pour le code réussi' },
    ],
    note: 'Le nombre d’heures réellement nécessaire dépend de votre évaluation de départ et de votre progression.',
    prices: [
      { label: 'Leçon de conduite, boîte manuelle', detail: '50 min', price: '50 €' },
      { label: 'Leçon de conduite, boîte automatique', detail: '50 min', price: '55 €' },
      { label: 'Évaluation de départ sur tablette', price: '50 €' },
      { label: 'Accompagnement à l’examen, manuelle', price: '50 €' },
      { label: 'Accompagnement à l’examen, automatique', price: '55 €' },
      { label: 'Forfait permis B', price: 'Sur devis' },
    ],
    subject: 'permis-b',
  },
  {
    id: 'conduite-accompagnee',
    area: 'aac',
    illus: 'aac',
    mark: '15',
    title: 'Conduite accompagnée (AAC)',
    tag: 'Dès 15 ans',
    short: 'Commencez tôt, roulez au moins 3 000 km avec un proche et profitez d’une période probatoire de 2 ans au lieu de 3.',
    intro: 'L’apprentissage anticipé de la conduite permet d’accumuler de l’expérience avec un proche, de jour comme de nuit, avant de passer le permis dès 17 ans.',
    audience: [
      'Vous avez 15 ans ou plus, avec l’accord de votre représentant légal.',
      'Un proche titulaire du permis B depuis au moins 5 ans peut vous accompagner.',
      'Votre assureur a donné son accord écrit pour l’extension de garantie.',
    ],
    steps: [
      { t: 'Formation initiale', d: 'Code réussi et au moins 20 h de conduite (13 h en boîte automatique).' },
      { t: 'Rendez-vous préalable', d: '2 heures de conduite avec l’enseignant et votre accompagnateur.' },
      { t: 'Conduite accompagnée', d: 'Au moins 1 an et 3 000 km, en France, avec 2 rendez-vous pédagogiques.' },
      { t: 'Examen pratique', d: 'Possible dès 17 ans, avec une vraie expérience de la route.' },
    ],
    facts: [
      { v: '3 000 km', l: 'minimum avec votre accompagnateur' },
      { v: '1 an', l: 'de conduite accompagnée minimum' },
      { v: '2 ans', l: 'de période probatoire au lieu de 3' },
      { v: '2 × 3 h', l: 'de rendez-vous pédagogiques' },
    ],
    advantages: [
      'Période probatoire réduite à 2 ans.',
      'Beaucoup d’expérience avant l’examen, par tous les temps.',
      'Votre accompagnateur reçoit un guide et participe aux rendez-vous.',
    ],
    prices: [
      { label: 'Forfait conduite accompagnée', price: 'Sur devis' },
      { label: 'Leçon supplémentaire, boîte manuelle', detail: '50 min', price: '50 €' },
    ],
    subject: 'aac',
  },
  {
    id: 'conduite-supervisee',
    area: 'sup',
    illus: 'supervisee',
    mark: '18',
    title: 'Conduite supervisée',
    tag: 'Dès 18 ans',
    short: 'Gagnez de l’expérience avec un accompagnateur après votre formation initiale, sans durée ni distance minimale.',
    intro: 'Idéale pour prendre de l’assurance avant l’examen, ou pour vous entraîner entre deux passages sans multiplier les leçons.',
    audience: [
      'Vous avez 18 ans ou plus.',
      'Vous avez réussi le code et terminé votre formation initiale.',
      'Vous voulez vous entraîner avant l’examen, ou après un échec.',
    ],
    steps: [
      { t: 'Formation initiale', d: 'Code réussi et formation pratique validée par l’attestation de fin de formation.' },
      { t: 'Rendez-vous préalable', d: '2 heures minimum avec l’enseignant et votre accompagnateur.' },
      { t: 'Conduite supervisée', d: 'Avec votre accompagnateur assis à l’avant, uniquement en France.' },
      { t: 'Examen pratique', d: 'Quand vous et votre enseignant vous sentez prêts.' },
    ],
    facts: [
      { v: '18 ans', l: 'âge minimum pour la phase supervisée' },
      { v: 'Libre', l: 'aucune durée ni distance minimale' },
      { v: '2 h', l: 'de rendez-vous préalable' },
      { v: '110', l: 'km/h maximum sur autoroute' },
    ],
    advantages: [
      'Plus de pratique sans multiplier les heures de leçon.',
      'Une formule souple, adaptée à votre rythme.',
      'Une bonne option pour préparer un nouveau passage.',
    ],
    prices: [
      { label: 'Forfait conduite supervisée', price: 'Sur devis' },
      { label: 'Leçon supplémentaire, boîte manuelle', detail: '50 min', price: '50 €' },
    ],
    subject: 'supervisee',
  },
  {
    id: 'code-de-la-route',
    area: 'code',
    illus: 'code',
    mark: '35',
    title: 'Code de la route',
    tag: 'En agence ou en ligne',
    short: 'Salle de code avec écran, entraînement en ligne et examen en centre agréé, route de Paris à Breuil-le-Vert.',
    intro: '40 questions, 35 bonnes réponses : le code se prépare avec méthode. Révisez dans notre salle de code ou en ligne, à votre rythme.',
    audience: [
      'Vous préparez un permis B, en formule classique ou accompagnée.',
      'Vous avez 16 ans ou plus, ou 15 ans en conduite accompagnée.',
      'Vous voulez un suivi régulier plutôt que réviser seul.',
    ],
    blocks: [
      { t: 'Entraînement', d: 'En agence dans la salle de code avec écran, ou en ligne depuis votre téléphone.' },
      { t: 'Séries', d: 'Des séries thématiques pour travailler priorités, signalisation, croisements, vitesse.' },
      { t: 'Suivi', d: 'On fait le point avec vous sur vos résultats avant de réserver votre examen.' },
      { t: 'Conseils', d: 'Des sessions courtes et régulières valent mieux qu’une longue révision la veille.' },
    ],
    facts: [
      { v: '35/40', l: 'bonnes réponses pour réussir' },
      { v: '30 €', l: 'le passage de l’examen, tarif réglementé' },
      { v: '5 ans', l: 'de validité une fois réussi' },
      { v: 'La Poste', l: 'centre d’examen au 635 route de Paris' },
    ],
    prices: [
      { label: 'Formation au code en ligne', price: 'Sur devis' },
      { label: 'Examen du code (centre agréé)', detail: 'réglé au centre', price: '30 €' },
    ],
    subject: 'code',
  },
  {
    id: 'perfectionnement',
    area: 'perf',
    illus: 'perf',
    mark: '+',
    title: 'Perfectionnement & autres formules',
    tag: 'Remise à niveau',
    short: 'Reprendre confiance après une pause, adopter l’éco-conduite, accélérer sa formation ou repasser le permis.',
    intro: 'Vous avez déjà conduit, ou vous devez aller vite ? Ces formules s’adaptent à votre situation. On en parle ensemble pour construire le bon programme.',
    extras: [
      { icon: 'RotateCcw', t: 'Perfectionnement', d: 'Reprendre le volant après plusieurs années, gagner en aisance en ville ou sur voie rapide.' },
      { icon: 'Leaf', t: 'Éco-conduite', d: 'Anticiper, rouler souple et consommer moins, sans perdre en sécurité.' },
      { icon: 'Timer', t: 'Formules accélérées', d: 'Un planning resserré pour avancer vite, selon vos disponibilités.' },
      { icon: 'KeyRound', t: 'Après annulation du permis', d: 'Un accompagnement pour repasser les épreuves nécessaires.' },
      { icon: 'Gauge', t: 'Boîte automatique (B78)', d: 'Formation de 13 h minimum. Pour passer ensuite en boîte manuelle, une formation de 7 h minimum est obligatoire.' },
    ],
    prices: [
      { label: 'Leçon de perfectionnement, manuelle', detail: '50 min', price: '50 €' },
      { label: 'Leçon de perfectionnement, automatique', detail: '50 min', price: '55 €' },
      { label: 'Programme sur mesure', price: 'Sur devis' },
    ],
    subject: 'perfectionnement',
  },
];

export const TAPE_ITEMS = [
  'Permis B',
  'Boîte automatique',
  'Conduite accompagnée',
  'Conduite supervisée',
  'Code en ligne',
  'Formules accélérées',
  'Perfectionnement',
  'Éco-conduite',
  'Après annulation',
];
