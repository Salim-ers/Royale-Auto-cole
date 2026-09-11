import React from 'react';
import { Link } from '../lib/router.jsx';
import { SITE } from '../data/site.js';
import { PageHero } from '../components/UI.jsx';

const Todo = ({ children }) => <span className="todo">{children}</span>;
const val = (v, label) => (v ? v : <Todo>{label} à compléter</Todo>);

function Mentions() {
  const c = SITE.company;
  return (
    <>
      <h2 className="h-sub display">Éditeur du site</h2>
      <dl>
        <div><dt>Dénomination</dt><dd>{c.legalName}, exploitant l’enseigne {SITE.name}</dd></div>
        <div><dt>Forme juridique</dt><dd>{c.form}</dd></div>
        <div><dt>Capital social</dt><dd>{val(c.capital, 'Montant')}</dd></div>
        <div><dt>Siège social</dt><dd>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</dd></div>
        <div><dt>SIREN / SIRET</dt><dd>{c.siren} / {c.siret}</dd></div>
        <div><dt>RCS</dt><dd>{val(c.rcs, 'Ville du RCS')}</dd></div>
        <div><dt>TVA intracommunautaire</dt><dd>{c.vat}</dd></div>
        <div><dt>Activité</dt><dd>{c.naf}</dd></div>
        <div><dt>Agrément préfectoral</dt><dd>{val(c.agrement, 'Numéro d’agrément')}</dd></div>
        <div><dt>Téléphone</dt><dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd></div>
        <div><dt>E-mail</dt><dd>{val(SITE.email, 'Adresse e-mail')}</dd></div>
        <div><dt>Directeur de la publication</dt><dd>{val(c.publicationDirector, 'Nom')}</dd></div>
      </dl>
      <h2 className="h-sub display">Hébergement</h2>
      <p>{val(c.host, 'Nom, adresse et téléphone de l’hébergeur')}</p>
      <h2 className="h-sub display">Propriété intellectuelle</h2>
      <p>Les textes, illustrations, logos et photographies de ce site sont la propriété de {SITE.name} ou utilisés avec autorisation. Toute reproduction sans accord préalable est interdite. Les informations réglementaires sont données à titre indicatif : seuls les textes officiels font foi.</p>
    </>
  );
}

function Confidentialite() {
  return (
    <>
      <h2 className="h-sub display">Données collectées</h2>
      <p>Le formulaire de contact recueille vos prénom, nom, téléphone et/ou e-mail, le sujet et le contenu de votre message. Ces données servent uniquement à répondre à votre demande et, si vous le souhaitez, à préparer votre inscription.</p>
      <h2 className="h-sub display">Base légale et conservation</h2>
      <p>Le traitement repose sur votre consentement, exprimé en cochant la case du formulaire. Les demandes sans suite sont conservées au maximum 3 ans après le dernier contact.</p>
      <h2 className="h-sub display">Destinataires</h2>
      <p>Les données sont destinées à l’équipe de {SITE.name}. Elles ne sont ni vendues ni cédées. Deux prestataires techniques agissent comme sous-traitants : Formspree (Formspree, Inc., États-Unis), qui achemine les messages du formulaire, et Vercel (Vercel Inc., États-Unis), qui héberge le site. Ces transferts de données hors de l’Union européenne sont encadrés par les clauses contractuelles types de la Commission européenne.</p>
      <h2 className="h-sub display">Vos droits</h2>
      <p>Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de limitation. Pour l’exercer, contactez-nous au {SITE.phone} ou via <Link to="/contact" style={{ textDecoration: 'underline' }}>le formulaire</Link>. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).</p>
    </>
  );
}

function Cookies() {
  return (
    <>
      <h2 className="h-sub display">Aucun cookie publicitaire</h2>
      <p>Ce site ne dépose pas de cookie de mesure d’audience ni de cookie publicitaire. Les polices de caractères sont hébergées avec le site.</p>
      <h2 className="h-sub display">Contenus tiers</h2>
      <p>La carte interactive de la page contact est fournie par Google Maps. Elle ne se charge que si vous cliquez sur « Afficher la carte interactive ». Google peut alors déposer ses propres cookies, régis par sa politique de confidentialité.</p>
      <h2 className="h-sub display">Modifier votre choix</h2>
      <p>Pour ne plus charger la carte, rechargez simplement la page : elle s’affiche à nouveau en version schématique. Vous pouvez aussi supprimer les cookies depuis les réglages de votre navigateur.</p>
    </>
  );
}

const PAGES = {
  mentions: { title: 'Mentions légales', Comp: Mentions },
  confidentialite: { title: 'Politique de confidentialité', Comp: Confidentialite },
  cookies: { title: 'Gestion des cookies', Comp: Cookies },
};

export default function Legal({ type }) {
  const { title, Comp } = PAGES[type];
  return (
    <div className="page">
      <PageHero crumbs={[{ label: title }]} title={title} titleClass="h-article" />
      <section className="section theme-beton">
        <div className="wrap legal-wrap prose" style={{ maxWidth: 820 }}>
          <Comp />
        </div>
      </section>
    </div>
  );
}
