/* ==========================================================================
   CONFIGURATION — Royale Auto-école
   Toutes les informations propres à l'auto-école sont centralisées ici.

   Sources des données déjà renseignées (relevées en septembre 2026) :
   fiche Google, fiche Vroomvroom, annuaire des entreprises (INSEE/INPI),
   bio Instagram @royaleautoecole, photos de l'agence.

   Les champs vides marqués « À COMPLÉTER » sont masqués sur le site
   ou affichés comme emplacement clairement identifié.
   ========================================================================== */

export const SITE = {
  name: 'Royale Auto-école',
  slogan: 'La route vers votre liberté commence ici.',
  signature: 'La safe place du permis', // bio Instagram

  // À COMPLÉTER : domaine définitif (canonical, sitemap, Open Graph)
  url: 'https://www.votre-domaine.fr',

  phone: '06 27 67 09 54',
  phoneHref: 'tel:+33627670954',
  email: '', // À COMPLÉTER

  address: {
    street: '357 route de Paris',
    postalCode: '60600',
    city: 'Breuil-le-Vert',
    department: 'Oise',
    departmentCode: '60',
    region: 'Hauts-de-France',
    country: 'FR',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Royale%20Auto-%C3%A9cole%2C%20357%20route%20de%20Paris%2C%2060600%20Breuil-le-Vert',
  mapsEmbed: 'https://www.google.com/maps?q=357%20route%20de%20Paris%2C%2060600%20Breuil-le-Vert&output=embed',

  socials: [
    { id: 'instagram', label: 'Instagram', handle: '@royaleautoecole', url: 'https://www.instagram.com/royaleautoecole/' },
    { id: 'facebook', label: 'Facebook', url: '' }, // À COMPLÉTER
    { id: 'tiktok', label: 'TikTok', url: '' }, // À COMPLÉTER
  ],

  // Index 0 = lundi … 6 = dimanche. Plages au format 'HH:MM'.
  hours: {
    // ⚠ À VÉRIFIER : samedi 12 h – 17 h sur Vroomvroom, 14 h – 17 h sur la fiche Google.
    office: [
      [['14:00', '19:00']],
      [['14:00', '19:00']],
      [['14:00', '19:00']],
      [['14:00', '19:00']],
      [['14:00', '19:00']],
      [['12:00', '17:00']],
      [],
    ],
    driving: [
      [['07:00', '21:00']],
      [['07:00', '21:00']],
      [['07:00', '21:00']],
      [['07:00', '21:00']],
      [['07:00', '21:00']],
      [['08:00', '20:00']],
      [],
    ],
  },

  ratings: {
    google: { score: 5, count: 111, url: 'https://www.google.com/maps/search/?api=1&query=Royale%20Auto-%C3%A9cole%20Breuil-le-Vert' },
    vroomvroom: { score: 5, count: 94, verified: 90, trust: 96 },
    updated: 'septembre 2026',
  },

  // Chiffres du compteur (page d'accueil). Taux de réussite et nombre
  // d'élèves non communiqués : ajoutez-les ici quand vous les avez, ex.
  // { value: 85, suffix: ' %', fraction: 0.85, label: 'Taux de réussite', sub: 'permis B, 2026' }
  stats: [
    { value: 5, decimals: 1, suffix: '/5', fraction: 1, label: 'Note Google', sub: 'sur 111 avis' },
    { value: 111, fraction: 0.74, label: 'Avis Google', sub: 'et 94 sur Vroomvroom' },
    { value: 96, suffix: ' %', fraction: 0.96, label: 'Indice de confiance', sub: 'mesuré par Vroomvroom' },
    { value: 6, suffix: ' j/7', fraction: 0.86, label: 'Une équipe à votre écoute', sub: 'du lundi au samedi' },
  ],

  company: {
    legalName: 'ROYALE AUTO ECOLE',
    form: 'SAS, société par actions simplifiée',
    siren: '941 942 708',
    siret: '941 942 708 00012',
    vat: 'FR80 941 942 708',
    naf: '85.53Z, enseignement de la conduite',
    created: '2025-03-11',
    capital: '', // À COMPLÉTER
    rcs: '', // À COMPLÉTER
    agrement: '', // À COMPLÉTER : numéro d'agrément préfectoral
    publicationDirector: '', // À COMPLÉTER
    host: '', // À COMPLÉTER : nom, adresse et téléphone de l'hébergeur
  },

  network: 'Unidec',
  payments: ['Chèque', 'Espèces', 'Facilités de paiement'],
  examCenter: { name: 'Centre d’examen du code La Poste', address: '635 route de Paris, 60600 Breuil-le-Vert' },

  // Adresse d'envoi du formulaire (Formspree, Getform, API maison…). Vide = mode démo.
  formEndpoint: '',

  // Photos : déposez les fichiers dans /public/images avec ces noms.
  images: {
    devanture: '/images/devanture.webp',
    voiture: '/images/voiture.webp',
    salon: '/images/salon.webp',
    detente: '/images/espace-detente.webp',
    salleCode: '/images/salle-code.webp',
  },

  team: [
    {
      name: 'Amaury D.',
      role: 'Gérant et enseignant de la conduite',
      tags: ['Permis B', 'Référent pédagogique'],
      photo: '', // ex. '/images/equipe-amaury.jpg'
    },
    {
      name: 'Enseignant·e de la conduite',
      role: 'Présentation à compléter',
      tags: ['Photo à ajouter'],
      photo: '',
      placeholder: true,
    },
  ],

  // Histoire (page Qui sommes-nous). « when » peut être une date ou un repère.
  history: [
    { when: 'Mars 2025', title: 'Création', text: 'Royale Auto-école est immatriculée à Breuil-le-Vert, dans l’Oise.' },
    { when: 'Route de Paris', title: 'Une agence pas comme les autres', text: 'Devanture noire et or, salon en cuir, mur végétal et salle de code avec écran.' },
    { when: 'Sur la route', title: 'La voiture Royale', text: 'Carrosserie noire, bandes jaunes et blason sur le capot : difficile de la manquer.' },
    { when: '2026', title: '5,0 sur Google', text: 'Plus de 100 avis d’élèves, et une note qui se mérite à chaque leçon.' },
  ],

  values: [
    { t: 'Confiance', d: 'On avance à votre rythme, en expliquant chaque étape. La confiance au volant se construit, elle ne se force pas.' },
    { t: 'Respect', d: 'Respect des élèves, des horaires et des autres usagers : la base d’une conduite apaisée.' },
    { t: 'Pédagogie', d: 'Des explications claires et un suivi de vos compétences dans votre livret d’apprentissage numérique.' },
    { t: 'Sécurité', d: 'Apprendre à conduire, c’est d’abord apprendre à anticiper. La sécurité guide chaque leçon.' },
    { t: 'Réussite', d: 'Le permis, bien sûr. Mais surtout la capacité à rouler seul, sereinement, dès le lendemain.' },
  ],

  // Avis : remplacez les exemples par de vrais avis (avec l'accord des élèves).
  reviews: [
    {
      name: 'Élève Royale',
      source: 'Avis Vroomvroom',
      rating: 5,
      text: 'Excellente auto-école, je recommande à 1000 % ! J’ai passé mon permis en un mois et demi : formation rapide, des moniteurs exceptionnels, sérieux et professionnels.',
    },
    {
      name: 'Prénom',
      source: 'Avis Google',
      rating: 5,
      text: 'Équipe à l’écoute du premier appel jusqu’à l’examen. J’ai pris confiance dès les premières leçons.',
      example: true,
    },
    {
      name: 'Prénom',
      source: 'Avis Google',
      rating: 5,
      text: 'Un cadre agréable pour réviser le code et des horaires de conduite qui s’adaptent à mon emploi du temps.',
      example: true,
    },
  ],
};

export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const CONTACT_SUBJECTS = [
  { id: 'inscription', label: 'Inscription' },
  { id: 'permis-b', label: 'Permis B (boîte manuelle)' },
  { id: 'b78', label: 'Permis boîte automatique (B78)' },
  { id: 'aac', label: 'Conduite accompagnée (AAC)' },
  { id: 'supervisee', label: 'Conduite supervisée' },
  { id: 'code', label: 'Code de la route' },
  { id: 'perfectionnement', label: 'Perfectionnement ou remise à niveau' },
  { id: 'dossier', label: 'Question sur mon dossier' },
  { id: 'autre', label: 'Autre demande' },
];

export const NAV = [
  { to: '/', label: 'Accueil', full: 'Accueil' },
  { to: '/qui-sommes-nous', label: 'Qui sommes-nous\u00a0?', full: 'Qui sommes-nous\u00a0?' },
  { to: '/formations', label: 'Nos formations', full: 'Nos formations' },
  { to: '/reglementation', label: 'Réglementation', full: 'Réglementation & documents' },
  { to: '/securite-routiere', label: 'Sécurité routière', full: 'Sécurité routière' },
  { to: '/conseils', label: 'Conseils', full: 'Actualités & conseils' },
  { to: '/contact', label: 'Contact', full: 'Contact' },
];
