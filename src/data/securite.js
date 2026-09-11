/* ==========================================================================
   SÉCURITÉ ROUTIÈRE : panneaux, quiz, réflexes
   ========================================================================== */

export const SIGN_CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'danger', label: 'Danger' },
  { id: 'interdiction', label: 'Interdiction' },
  { id: 'obligation', label: 'Obligation' },
  { id: 'indication', label: 'Indication' },
  { id: 'priorite', label: 'Priorité' },
];

export const SIGNS = [
  { id: 'stop', cat: 'priorite', name: 'Stop', desc: 'Arrêt obligatoire à la limite de la chaussée abordée, puis cédez le passage à tous les usagers.' },
  { id: 'cedez', cat: 'priorite', name: 'Cédez le passage', desc: 'Ralentissez et laissez passer les usagers de la route abordée. L’arrêt n’est obligatoire que si nécessaire.' },
  { id: 'prioritaire', cat: 'priorite', name: 'Route prioritaire', desc: 'Vous êtes prioritaire aux intersections jusqu’au panneau de fin de route prioritaire.' },
  { id: 'priorite-droite', cat: 'priorite', name: 'Priorité à droite', desc: 'À la prochaine intersection, cédez le passage aux véhicules venant de votre droite.' },
  { id: 'intersection-prioritaire', cat: 'priorite', name: 'Intersection prioritaire', desc: 'Vous êtes prioritaire à la prochaine intersection seulement.' },
  { id: 'autres-dangers', cat: 'danger', name: 'Autres dangers', desc: 'Danger sans panneau spécifique : un panonceau en précise souvent la nature.' },
  { id: 'feux', cat: 'danger', name: 'Feux tricolores', desc: 'Signalisation lumineuse à l’approche : anticipez un éventuel arrêt.' },
  { id: 'virage-droite', cat: 'danger', name: 'Virage à droite', desc: 'Virage dangereux : ralentissez avant d’y entrer, pas pendant.' },
  { id: 'retrecie', cat: 'danger', name: 'Chaussée rétrécie', desc: 'La route se rétrécit des deux côtés : adaptez votre vitesse et votre position.' },
  { id: 'sens-interdit', cat: 'interdiction', name: 'Sens interdit', desc: 'Accès interdit à tout véhicule dans ce sens de circulation.' },
  { id: 'limite-50', cat: 'interdiction', name: 'Limitation à 50 km/h', desc: 'Vitesse maximale autorisée jusqu’à une nouvelle indication.' },
  { id: 'stationnement-interdit', cat: 'interdiction', name: 'Stationnement interdit', desc: 'Stationnement interdit. L’arrêt reste autorisé.' },
  { id: 'arret-interdit', cat: 'interdiction', name: 'Arrêt et stationnement interdits', desc: 'Ni arrêt, ni stationnement, même quelques secondes.' },
  { id: 'tout-droit', cat: 'obligation', name: 'Direction obligatoire tout droit', desc: 'À la prochaine intersection, seule la direction tout droit est autorisée.' },
  { id: 'contournement-droite', cat: 'obligation', name: 'Contournement par la droite', desc: 'Passez obligatoirement à droite de l’obstacle : îlot, travaux, séparateur.' },
  { id: 'tourner-droite', cat: 'obligation', name: 'Tourner à droite avant le panneau', desc: 'Obligation de tourner à droite avant d’atteindre le panneau.' },
  { id: 'vitesse-mini', cat: 'obligation', name: 'Vitesse minimale obligatoire', desc: 'Roulez au moins à cette vitesse, si les conditions le permettent.' },
  { id: 'parking', cat: 'indication', name: 'Parking', desc: 'Lieu aménagé pour le stationnement.' },
  { id: 'sens-unique', cat: 'indication', name: 'Sens unique', desc: 'La route est à sens unique, dans le sens de la flèche.' },
  { id: 'impasse', cat: 'indication', name: 'Impasse', desc: 'Voie sans issue : prévoyez un demi-tour.' },
  { id: 'vitesse-conseillee', cat: 'indication', name: 'Vitesse conseillée', desc: 'Vitesse recommandée. Ce n’est pas une limitation.' },
];

export const QUIZ = [
  {
    sign: 'priorite-droite',
    q: 'Vous arrivez à une intersection sans panneau ni feu. Une voiture arrive par votre droite. Que faites-vous\u00a0?',
    answers: ['Je passe, je suis sur la route la plus large', 'Je laisse passer le véhicule venant de droite', 'Je klaxonne pour signaler ma présence'],
    correct: 1,
    explain: 'Sans signalisation, la priorité à droite s’applique, quelle que soit la largeur des routes.',
  },
  {
    sign: 'feux',
    q: 'Le feu passe à l’orange fixe. Vous êtes à quelques mètres de la ligne d’arrêt, à allure normale.',
    answers: ['J’accélère pour passer', 'Je m’arrête, sauf si l’arrêt est dangereux', 'Je continue, l’orange autorise le passage'],
    correct: 1,
    explain: 'Le feu jaune fixe impose l’arrêt, sauf si vous ne pouvez plus vous arrêter dans de bonnes conditions de sécurité.',
  },
  {
    visual: 'speed',
    q: 'Il pleut. Sur une autoroute normalement limitée à 130 km/h, votre vitesse maximale est de…',
    answers: ['130 km/h', '110 km/h', '90 km/h'],
    correct: 1,
    explain: 'Par temps de pluie, la vitesse maximale passe de 130 à 110 km/h sur autoroute.',
  },
  {
    visual: 'distance',
    q: 'Quel intervalle minimum gardez-vous avec le véhicule qui vous précède\u00a0?',
    answers: ['1 seconde', '2 secondes', 'La longueur d’une voiture'],
    correct: 1,
    explain: 'Gardez au moins 2 secondes. Sur autoroute, cela correspond à deux traits de la bande d’arrêt d’urgence.',
  },
  {
    sign: 'stop',
    q: 'Vous arrivez à un STOP. Aucun véhicule n’est en vue. Que faites-vous\u00a0?',
    answers: ['Je marque l’arrêt complet, puis je repars', 'Je ralentis fortement sans m’arrêter', 'Je passe, la voie est libre'],
    correct: 0,
    explain: 'L’arrêt est obligatoire au STOP, même quand la voie semble libre.',
  },
  {
    visual: 'alcohol',
    q: 'Jeune conducteur en permis probatoire : quel est le taux d’alcool maximal autorisé\u00a0?',
    answers: ['0,5 g/L de sang', '0,2 g/L de sang', '0,8 g/L de sang'],
    correct: 1,
    explain: 'En permis probatoire, la limite est de 0,2 g/L de sang : concrètement, zéro verre.',
  },
];

export const REFLEXES = [
  { id: 'ceinture', icon: 'seatbelt', color: '#ff5a5f', title: 'Ceinture', rule: 'À l’avant comme à l’arrière, sur chaque trajet, même court. Le conducteur veille à ce que les passagers mineurs soient attachés.', sanction: '135 € et 3 points' },
  { id: 'telephone', icon: 'phone', color: '#ff5a5f', title: 'Téléphone', rule: 'Téléphone tenu en main interdit en circulation, même arrêté à un feu. Écouteurs et oreillettes aussi.', sanction: '135 € et 3 points' },
  { id: 'alcool', icon: 'alcohol', color: '#ff5a5f', title: 'Alcool', rule: '0,5 g/L de sang au maximum, 0,2 g/L en permis probatoire. Le plus simple : zéro verre avant de conduire.', sanction: 'Contrôles fréquents' },
  { id: 'vitesse', icon: 'speed', color: '#f6b800', title: 'Vitesse', rule: 'Adaptez-vous aux conditions. Sous la pluie : 110 km/h au lieu de 130 sur autoroute, 100 au lieu de 110.', sanction: 'Limites réduites par temps de pluie' },
  { id: 'distances', icon: 'distance', color: '#f6b800', title: 'Distances de sécurité', rule: 'Au moins 2 secondes avec le véhicule devant. Sur autoroute : deux traits de la bande d’arrêt d’urgence.', sanction: '2 secondes minimum' },
  { id: 'somnolence', icon: 'sleep', color: '#5aa2ff', title: 'Somnolence', rule: 'Une pause toutes les 2 heures. Bâillements, yeux qui piquent, nuque raide : arrêtez-vous.', sanction: 'Pause toutes les 2 h' },
];
