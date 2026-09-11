/* ==========================================================================
   RÉGLEMENTATION & DOCUMENTS
   Sources : service-public.gouv.fr (fiches F2826, F21012, F33694)
   et France Titres / ANTS (inscription à l'examen). Vérifié en septembre 2026.
   ========================================================================== */

export const PROFILES = [
  { id: '15', label: '15 ans' },
  { id: '16', label: '16 ou 17 ans' },
  { id: '18', label: '18 à 24 ans' },
  { id: '25', label: '25 ans et plus' },
];

// who : profils concernés. hosted : uniquement si hébergé chez un proche.
export const DOCUMENTS = [
  { id: 'id', title: 'Pièce d’identité en cours de validité', hint: 'Carte d’identité, passeport ou titre de séjour.', who: ['15', '16', '18', '25'], badge: 'Tous' },
  { id: 'domicile', title: 'Justificatif de domicile de moins de 6 mois', hint: 'Facture d’énergie, de téléphone, avis d’imposition…', who: ['15', '16', '18', '25'], badge: 'Tous' },
  { id: 'ephoto', title: 'E-photo : code photo et signature numérique', hint: 'Délivré par un photographe ou une cabine agréés ANTS.', who: ['15', '16', '18', '25'], badge: 'Tous' },
  { id: 'assr', title: 'ASSR 2 ou ASR', hint: 'Attestation obtenue au collège. Sans ASR, renseignez-vous auprès du GRETA de l’Oise.', who: ['15', '16', '18'], badge: 'Selon âge' },
  { id: 'recensement', title: 'Attestation de recensement', hint: 'Demandée aux candidats de 16 à 18 ans.', who: ['16'], badge: '16–17 ans' },
  { id: 'jdc', title: 'Certificat de participation à la JDC', hint: 'Ou attestation d’exemption, ou attestation de situation vis-à-vis du service national.', who: ['18'], badge: '18–24 ans' },
  { id: 'legal-id', title: 'Pièce d’identité du représentant légal', hint: 'Pour les candidats mineurs.', who: ['15', '16'], badge: 'Mineurs' },
  { id: 'accord', title: 'Accord du représentant légal', hint: 'Indispensable pour la conduite accompagnée.', who: ['15', '16'], badge: 'Mineurs' },
  { id: 'hebergement', title: 'Attestation d’hébergement signée', hint: 'Avec la pièce d’identité et un justificatif de domicile de la personne qui vous héberge.', who: ['15', '16', '18', '25'], hosted: true, badge: 'Hébergé' },
];

export const RULES = [
  {
    id: 'inscription',
    icon: 'ClipboardCheck',
    title: 'Conditions d’inscription',
    chips: [['15 ans', 'en conduite accompagnée'], ['NEPH', 'votre numéro de dossier']],
    body: [
      { p: 'Avant de commencer, l’auto-école signe avec vous un contrat de formation conforme au contrat type : programme, tarifs et obligations de chacun y sont précisés.' },
      { list: [
        'Votre demande d’inscription est déposée auprès de l’ANTS avec les pièces justificatives.',
        'Vous recevez une attestation d’inscription au permis de conduire avec votre numéro NEPH.',
        'Vous accédez à un livret d’apprentissage numérique qui retrace votre formation.',
      ] },
    ],
  },
  {
    id: 'age',
    icon: 'CalendarCheck',
    title: 'Âge minimum',
    chips: [['15 ans', 'code en AAC'], ['16 ans', 'code en formule classique'], ['17 ans', 'examen pratique'], ['18 ans', 'conduite supervisée']],
    body: [
      { p: 'Depuis le 1er janvier 2024, le permis B peut être obtenu dès 17 ans et permet de conduire seul en France dès son obtention.' },
      { list: [
        'Code de la route : dès 15 ans en conduite accompagnée, dès 16 ans sinon.',
        'Conduite accompagnée : inscription possible dès 15 ans.',
        'Examen pratique du permis B : dès 17 ans.',
        'Conduite supervisée : phase accessible dès 18 ans.',
      ] },
      { p: 'Avec un permis obtenu à 17 ans, la conduite à l’étranger n’est possible qu’à partir de 18 ans.' },
    ],
  },
  {
    id: 'permis-b',
    icon: 'Car',
    title: 'Permis B',
    chips: [['20 h', 'minimum en manuelle'], ['13 h', 'minimum en automatique'], ['3 ans', 'de période probatoire']],
    body: [
      { p: 'La formation pratique dure au minimum 20 heures en boîte manuelle et 13 heures en boîte automatique. Le volume réel dépend de votre évaluation de départ et de vos progrès.' },
      { list: [
        'Permis probatoire : capital initial de 6 points, 12 points au terme de la période probatoire sans retrait de points.',
        'Période probatoire de 3 ans, ramenée à 2 ans après une conduite accompagnée.',
        'Jeunes conducteurs : 110 km/h maximum sur autoroute et taux d’alcool limité à 0,2 g/L de sang.',
        'Permis boîte automatique : une formation de 7 heures minimum est obligatoire pour conduire ensuite une boîte manuelle.',
      ] },
    ],
  },
  {
    id: 'aac',
    icon: 'Users',
    title: 'Conduite accompagnée',
    chips: [['1 an', 'minimum'], ['3 000 km', 'minimum'], ['2 ans', 'de probatoire']],
    body: [
      { p: 'L’apprentissage anticipé de la conduite se déroule en deux phases : une formation initiale en auto-école, puis une période de conduite avec un ou plusieurs accompagnateurs.' },
      { list: [
        'Pour démarrer la conduite accompagnée : code réussi, attestation de fin de formation initiale, accord écrit de l’assureur et rendez-vous préalable de 2 heures.',
        'Conduire au moins 1 an et 3 000 km, uniquement en France, de jour, de nuit et par différentes conditions météo.',
        'Deux rendez-vous pédagogiques de 3 heures : le premier 4 à 6 mois après la fin de la formation initiale, le second après 3 000 km.',
        'Vitesses maximales : 110 km/h sur autoroute limitée à 130, 100 km/h sur les autres autoroutes et routes à chaussées séparées, 80 km/h sur les autres routes, 50 km/h en agglomération.',
        'Un signe distinctif doit être apposé à l’arrière gauche du véhicule.',
      ] },
    ],
  },
  {
    id: 'supervisee',
    icon: 'Eye',
    title: 'Conduite supervisée',
    chips: [['18 ans', 'minimum'], ['Libre', 'durée et distance']],
    body: [
      { p: 'La conduite supervisée complète la formation initiale par une période de conduite avec un accompagnateur. Elle n’impose ni durée ni distance minimale.' },
      { list: [
        'Conditions : code réussi, attestation de fin de formation initiale et accord écrit de l’assureur.',
        'Rendez-vous préalable de 2 heures minimum avec l’enseignant et au moins un accompagnateur.',
        'L’accompagnateur est assis à l’avant. La conduite à l’étranger est interdite pendant cette période.',
        'Limitations spécifiques, dont 110 km/h sur les autoroutes limitées à 130.',
      ] },
    ],
  },
  {
    id: 'code',
    icon: 'BookOpen',
    title: 'Examen du code',
    chips: [['40', 'questions'], ['35', 'bonnes réponses'], ['30 €', 'le passage']],
    body: [
      { p: 'L’épreuve théorique générale se passe dans un centre agréé, par exemple le centre La Poste situé 635 route de Paris à Breuil-le-Vert.' },
      { list: [
        '40 questions à choix multiples, 35 bonnes réponses minimum pour réussir.',
        'Le passage coûte 30 €, inscription et attestation de résultat comprises.',
        'Le code reste valable 5 ans, y compris si vous changez de formule de formation.',
        'Pendant ces 5 ans, vous pouvez vous présenter jusqu’à 5 fois à l’examen pratique.',
      ] },
    ],
  },
  {
    id: 'pratique',
    icon: 'Flag',
    title: 'Examen pratique',
    chips: [['32 min', 'd’épreuve'], ['48 h', 'pour le résultat']],
    body: [
      { p: 'L’épreuve dure environ 32 minutes, en présence d’un inspecteur du permis de conduire. L’auto-école vous accompagne ce jour-là.' },
      { list: [
        'Conduite en circulation, dont une séquence en autonomie.',
        'Vérifications sur le véhicule, questions de sécurité routière et de premiers secours.',
        'Il faut atteindre le niveau requis sur la grille d’évaluation nationale, sans erreur éliminatoire.',
        'Résultat disponible 48 heures après l’examen, hors week-end et jours fériés.',
      ] },
    ],
  },
  {
    id: 'documents-administratifs',
    icon: 'FileText',
    title: 'Documents administratifs',
    chips: [['6 mois', 'max pour le justificatif de domicile'], ['ANTS', 'dépôt en ligne']],
    body: [
      { p: 'Les pièces demandées dépendent de votre âge et de votre situation. Utilisez la checklist ci-dessus pour préparer votre dossier.' },
      { list: [
        'En cas de contrôle pendant la conduite accompagnée ou supervisée : carte grise du véhicule, attestation d’inscription au permis et permis de l’accompagnateur.',
        'Les documents doivent être lisibles et à jour : un scan flou ou un justificatif trop ancien retarde le dossier.',
      ] },
    ],
  },
  {
    id: 'accompagnateurs',
    icon: 'HeartHandshake',
    title: 'Règles pour les accompagnateurs',
    chips: [['5 ans', 'de permis B minimum'], ['0', 'annulation ou invalidation en 5 ans']],
    body: [
      { p: 'Vous pouvez avoir un ou plusieurs accompagnateurs, membres de la famille ou amis. Chacun doit remplir toutes les conditions.' },
      { list: [
        'Être titulaire du permis B depuis 5 ans ou plus.',
        'Avoir l’accord écrit de la société d’assurances pour l’extension de garantie.',
        'Ne pas avoir fait l’objet d’une annulation ou invalidation du permis dans les 5 dernières années.',
        'Être assis à l’avant, à côté de l’élève. En AAC, au moins un accompagnateur assiste à chaque rendez-vous pédagogique.',
      ] },
    ],
  },
];
