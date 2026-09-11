import { SITE } from './site.js';
import { ARTICLES } from './articles.js';

const BRAND = 'Royale Auto-école';

export const PAGES_SEO = {
  '/': {
    title: 'Auto-école à Breuil-le-Vert (60) : permis B, AAC, code | Royale Auto-école',
    description: 'Royale Auto-école, 357 route de Paris à Breuil-le-Vert (Oise) : permis B en boîte manuelle ou automatique, conduite accompagnée, conduite supervisée et code de la route.',
  },
  '/qui-sommes-nous': {
    title: `Qui sommes-nous\u00a0? L’équipe de ${BRAND} à Breuil-le-Vert`,
    description: 'Une auto-école, mais surtout une équipe : découvrez l’histoire, les valeurs et l’agence de Royale Auto-école, route de Paris à Breuil-le-Vert.',
  },
  '/formations': {
    title: `Formations permis B, conduite accompagnée et code dans l’Oise | ${BRAND}`,
    description: 'Permis B manuel ou automatique, AAC dès 15 ans, conduite supervisée, code de la route et perfectionnement à Breuil-le-Vert (60). Tarifs et déroulement.',
  },
  '/reglementation': {
    title: `Documents et réglementation du permis de conduire | ${BRAND}`,
    description: 'Pièces à fournir selon votre âge, âge minimum, conduite accompagnée, examens du code et pratique : tout ce qu’il faut savoir avant de commencer.',
  },
  '/securite-routiere': {
    title: `Sécurité routière : panneaux, quiz et bons réflexes | ${BRAND}`,
    description: 'Révisez les panneaux routiers, testez-vous avec un mini quiz et retrouvez les réflexes qui sauvent : ceinture, téléphone, alcool, vitesse, distances.',
  },
  '/conseils': {
    title: `Conseils pour réussir son code et son permis | ${BRAND}`,
    description: 'Astuces pour réussir le code de la route, gérer le stress de l’examen et comprendre la conduite accompagnée, par Royale Auto-école à Breuil-le-Vert.',
  },
  '/contact': {
    title: `Contact et horaires | ${BRAND}, Breuil-le-Vert`,
    description: 'Appelez le 06 27 67 09 54 ou écrivez-nous. Royale Auto-école, 357 route de Paris, 60600 Breuil-le-Vert. Horaires d’accueil et de conduite.',
  },
  '/mentions-legales': { title: `Mentions légales | ${BRAND}`, description: 'Mentions légales du site de Royale Auto-école.', noindex: false },
  '/confidentialite': { title: `Politique de confidentialité | ${BRAND}`, description: 'Comment Royale Auto-école traite les données transmises via le site.' },
  '/cookies': { title: `Gestion des cookies | ${BRAND}`, description: 'Informations sur les cookies et contenus tiers du site de Royale Auto-école.' },
};

export function seoFor(pathname) {
  if (pathname.startsWith('/conseils/')) {
    const a = ARTICLES.find((x) => `/conseils/${x.slug}` === pathname);
    if (a) return { title: `${a.title} | ${BRAND}`, description: a.excerpt, type: 'article' };
  }
  return PAGES_SEO[pathname] || { title: `Page introuvable | ${BRAND}`, description: SITE.slogan, noindex: true };
}

export function allRoutes() {
  return [...Object.keys(PAGES_SEO), ...ARTICLES.map((a) => `/conseils/${a.slug}`)];
}

export function localBusinessJsonLd() {
  const toSpec = (days, idx) => days.flatMap((ranges, i) => ranges.map(([opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${idx[i]}`, opens, closes })));
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return {
    '@context': 'https://schema.org',
    // schema.org ne propose pas de type « DrivingSchool » : on combine LocalBusiness et EducationalOrganization.
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': `${SITE.url}/#auto-ecole`,
    name: SITE.name,
    legalName: SITE.company.legalName,
    description: 'Auto-école à Breuil-le-Vert (Oise) : permis B, boîte automatique, conduite accompagnée, conduite supervisée, code de la route et perfectionnement.',
    url: SITE.url,
    telephone: '+33627670954',
    ...(SITE.email ? { email: SITE.email } : {}),
    image: `${SITE.url}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: [{ '@type': 'City', name: 'Breuil-le-Vert' }, { '@type': 'AdministrativeArea', name: 'Oise' }],
    openingHoursSpecification: toSpec(SITE.hours.office, dayNames),
    sameAs: SITE.socials.filter((s) => s.url).map((s) => s.url),
    taxID: SITE.company.siren.replace(/\s/g, ''),
    paymentAccepted: SITE.payments.join(', '),
  };
}
