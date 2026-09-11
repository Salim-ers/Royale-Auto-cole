import React, { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Navigation, Send } from 'lucide-react';
import { Link, useRouter } from '../lib/router.jsx';
import { formatRanges, useOpenStatus } from '../lib/hooks.js';
import { SITE, DAYS, CONTACT_SUBJECTS } from '../data/site.js';
import { Button, PageHero } from '../components/UI.jsx';
import { Crest, Signal, TopCar } from '../components/Brand.jsx';
import { Socials } from '../components/Layout.jsx';

const EMPTY = { prenom: '', nom: '', tel: '', email: '', sujet: '', message: '', consent: false };

function validate(v) {
  const e = {};
  if (!v.prenom.trim()) e.prenom = 'Indiquez votre prénom.';
  if (!v.nom.trim()) e.nom = 'Indiquez votre nom.';
  const tel = v.tel.replace(/[\s.-]/g, '');
  if (!tel && !v.email.trim()) e.tel = 'Indiquez un téléphone ou un e-mail pour qu’on puisse vous répondre.';
  if (tel && !/^(\+33|0)[1-9]\d{8}$/.test(tel)) e.tel = 'Ce numéro ne semble pas valide. Exemple : 06 12 34 56 78.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Cette adresse e-mail ne semble pas valide.';
  if (!v.sujet) e.sujet = 'Choisissez le sujet de votre demande.';
  if (v.message.trim().length < 10) e.message = 'Précisez votre demande en quelques mots (10 caractères minimum).';
  if (!v.consent) e.consent = 'Cochez cette case pour que nous puissions traiter votre demande.';
  return e;
}

function Field({ id, label, optional, error, children, full }) {
  return (
    <div className={`field${full ? ' field--full' : ''}${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}{optional && <span className="opt"> (facultatif)</span>}</label>
      {children}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

function ContactForm() {
  const { query } = useRouter();
  const preset = CONTACT_SUBJECTS.some((s) => s.id === query.get('sujet')) ? query.get('sujet') : '';
  const [values, setValues] = useState({ ...EMPTY, sujet: preset });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((er) => { const n = { ...er }; delete n[k]; return n; });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      const el = formRef.current && formRef.current.querySelector(`#f-${firstKey}`);
      if (el) el.focus();
      return;
    }
    if (!SITE.formEndpoint) {
      setStatus('demo');
      return;
    }
    setStatus('sending');
    try {
      const subject = CONTACT_SUBJECTS.find((s) => s.id === values.sujet);
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, sujet: subject ? subject.label : values.sujet }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch (err) {
      setStatus('error');
    }
  };

  const describe = (k) => (errors[k] ? `f-${k}-error` : undefined);

  if (status === 'sent' || status === 'demo') {
    return (
      <div className="form-success" role="status">
        <div className="form-success-road" aria-hidden="true"><TopCar /></div>
        <h2 className="display h-sub">Demande envoyée, {values.prenom}&nbsp;!</h2>
        <p className="lead muted">Merci. L’équipe vous recontacte au plus vite. Pour une réponse immédiate, appelez le {SITE.phone}.</p>
        {status === 'demo' && <p className="notice small"><span aria-hidden="true">ⓘ</span><span>Mode démonstration : aucune adresse de réception n’est encore configurée (champ « formEndpoint » dans src/data/site.js).</span></p>}
        <Button onClick={() => { setValues({ ...EMPTY }); setStatus('idle'); }} variant="ghost-dark" signal={false}>Envoyer une autre demande</Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h2 id="form-title" className="display h-sub" style={{ marginBottom: 8 }}>Écrivez-nous</h2>
      <p className="muted" style={{ marginBottom: 26 }}>Tous les champs sont obligatoires, sauf mention contraire. Indiquez au moins un téléphone ou un e-mail.</p>
      <div className="form-grid">
        <Field id="f-prenom" label="Prénom" error={errors.prenom}>
          <input id="f-prenom" className="input" autoComplete="given-name" value={values.prenom} onChange={set('prenom')} aria-invalid={!!errors.prenom} aria-describedby={describe('prenom')} />
        </Field>
        <Field id="f-nom" label="Nom" error={errors.nom}>
          <input id="f-nom" className="input" autoComplete="family-name" value={values.nom} onChange={set('nom')} aria-invalid={!!errors.nom} aria-describedby={describe('nom')} />
        </Field>
        <Field id="f-tel" label="Téléphone" error={errors.tel}>
          <input id="f-tel" className="input" type="tel" inputMode="tel" autoComplete="tel" value={values.tel} onChange={set('tel')} aria-invalid={!!errors.tel} aria-describedby={describe('tel')} />
        </Field>
        <Field id="f-email" label="E-mail" error={errors.email}>
          <input id="f-email" className="input" type="email" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={describe('email')} />
        </Field>
        <Field id="f-sujet" label="Sujet" error={errors.sujet} full>
          <select id="f-sujet" className="input" value={values.sujet} onChange={set('sujet')} aria-invalid={!!errors.sujet} aria-describedby={describe('sujet')}>
            <option value="">Choisir un sujet</option>
            {CONTACT_SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </Field>
        <Field id="f-message" label="Message" error={errors.message} full>
          <textarea id="f-message" className="input" value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={describe('message')} placeholder="Votre âge, la formation qui vous intéresse, vos disponibilités…" />
        </Field>
        <div className={`field field--full${errors.consent ? ' has-error' : ''}`}>
          <label className="consent" htmlFor="f-consent">
            <input id="f-consent" type="checkbox" checked={values.consent} onChange={set('consent')} aria-invalid={!!errors.consent} aria-describedby={describe('consent')} />
            <span>J’accepte que Royale Auto-école utilise ces informations pour répondre à ma demande. <Link to="/confidentialite" style={{ textDecoration: 'underline' }}>En savoir plus</Link></span>
          </label>
          {errors.consent && <p className="field-error" id="f-consent-error">{errors.consent}</p>}
        </div>
      </div>
      <div className="form-foot">
        <Button type="submit" variant="nuit" disabled={status === 'sending'} icon={<Send aria-hidden="true" />} signal={false}>
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </Button>
        {status === 'error' && <p className="field-error" role="alert">L’envoi n’a pas abouti. Réessayez ou appelez le {SITE.phone}.</p>}
      </div>
    </form>
  );
}

function Hours() {
  const [tab, setTab] = useState('office');
  const status = useOpenStatus('office');
  return (
    <div className="info-card">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div className="info-row" style={{ gridTemplateColumns: '22px auto' }}><Clock aria-hidden="true" /><h3 className="h-card">Horaires</h3></div>
        <span className={`status${status.open ? ' is-open' : ''}`}><i aria-hidden="true" />{status.label}</span>
      </div>
      <div className="tabs-mini" role="tablist" aria-label="Type d’horaires">
        <button role="tab" id="tab-office" aria-selected={tab === 'office'} aria-controls="hours-panel" onClick={() => setTab('office')}>Accueil</button>
        <button role="tab" id="tab-driving" aria-selected={tab === 'driving'} aria-controls="hours-panel" onClick={() => setTab('driving')}>Leçons de conduite</button>
      </div>
      <table className="hours" id="hours-panel" role="tabpanel" aria-labelledby={tab === 'office' ? 'tab-office' : 'tab-driving'}>
        <caption className="sr-only">{tab === 'office' ? 'Horaires d’accueil' : 'Horaires des leçons de conduite'}</caption>
        <tbody>
          {DAYS.map((d, i) => (
            <tr key={d} className={status.today === i ? 'is-today' : ''}>
              <th scope="row">{d}</th>
              <td>{formatRanges(SITE.hours[tab][i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MapBlock() {
  const [on, setOn] = useState(false);
  return (
    <div className="map-card">
      {on ? (
        <iframe title="Carte : Royale Auto-école, 357 route de Paris, Breuil-le-Vert" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="map-plan" aria-hidden="true">
          <svg viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid slice">
            <rect width="1000" height="420" fill="#141B2B" />
            <path d="M-20 300 C 200 280, 360 180, 560 170 S 900 120, 1040 60" stroke="#222C42" strokeWidth="46" fill="none" />
            <path d="M-20 300 C 200 280, 360 180, 560 170 S 900 120, 1040 60" stroke="#F6B800" strokeWidth="3" strokeDasharray="0" opacity=".8" fill="none" />
            <path d="M420 -20 C 440 120, 470 300, 440 440" stroke="#1B2436" strokeWidth="22" fill="none" />
            <path d="M-20 90 C 180 120, 300 60, 520 40" stroke="#1B2436" strokeWidth="16" fill="none" />
            <path d="M640 440 C 660 330, 720 260, 1020 250" stroke="#1B2436" strokeWidth="16" fill="none" />
            <text x="90" y="262" fill="rgba(255,255,255,.55)" fontSize="18" fontFamily="inherit" transform="rotate(-8 90 262)">Route de Paris</text>
            <g transform="translate(470 176)">
              <circle r="46" fill="rgba(246,184,0,.16)" />
              <path d="M0 22 C-6 10 -22 0 -22 -16 A22 22 0 0 1 22 -16 C22 0 6 10 0 22z" fill="#F6B800" transform="translate(0 -18)" />
              <circle cy="-34" r="7" fill="#0E1422" />
            </g>
            <g transform="translate(800 118)">
              <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#fff" />
              <text y="6" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0E1422" fontFamily="inherit">LP</text>
            </g>
          </svg>
        </div>
      )}
      {!on && (
        <div className="map-overlay glass">
          <p><b>Royale Auto-école</b>, {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}<br /><span style={{ color: 'var(--alu-2)' }}>Plan schématique. LP : {SITE.examCenter.name}, {SITE.examCenter.address}.</span></p>
          <div className="hero-actions">
            <Button onClick={() => setOn(true)} size="sm" signal={false}>Afficher la carte interactive</Button>
            <Button to={SITE.mapsUrl} size="sm" variant="ghost" signal={false} icon={<Navigation aria-hidden="true" />}>Itinéraire</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const insta = SITE.socials.find((s) => s.id === 'instagram');
  return (
    <div className="page">
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        title={'Une question\u00a0? Parlons-en.'}
        lead="Par téléphone, par message ou directement à l’agence, route de Paris : on vous répond du lundi au samedi."
        aside={<div className="illus-card" style={{ display: 'grid', placeItems: 'center', background: 'var(--nuit-2)' }}><Crest className="" style={{ width: '38%' }} /></div>}
      >
        <a className="call-big" href={SITE.phoneHref} style={{ maxWidth: 520 }}>
          <span className="call-big-ico"><Phone className="ph-call" aria-hidden="true" /></span>
          <span><small>Appeler l’auto-école</small><b>{SITE.phone}</b></span>
          <Signal />
        </a>
      </PageHero>

      <section className="section theme-beton" aria-label="Formulaire et coordonnées">
        <div className="wrap contact-grid">
          <div className="form-card" data-reveal><ContactForm /></div>
          <div className="info-stack">
            <div className="info-card" data-reveal>
              <div className="info-row"><MapPin aria-hidden="true" /><div><h3 className="h-card">Adresse</h3><p>{SITE.address.street}<br />{SITE.address.postalCode} {SITE.address.city}</p></div></div>
              <a className="text-link" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ justifySelf: 'start' }}>Ouvrir l’itinéraire<Signal /></a>
            </div>
            <div className="info-card" data-reveal>
              <div className="info-row"><Phone aria-hidden="true" /><div><h3 className="h-card">Téléphone</h3><p><a href={SITE.phoneHref}>{SITE.phone}</a></p></div></div>
              <div className="info-row">
                <Mail aria-hidden="true" />
                <div><h3 className="h-card">E-mail</h3>{SITE.email ? <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p> : <p className="muted">Écrivez-nous via le formulaire ou sur Instagram.</p>}</div>
              </div>
            </div>
            <div data-reveal><Hours /></div>
            <div className="info-card" data-reveal>
              <div className="info-row"><Instagram aria-hidden="true" /><div><h3 className="h-card">Réseaux sociaux</h3><p className="muted">{insta.handle} : infos et questions en message privé.</p></div></div>
              <Socials />
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-beton" style={{ paddingTop: 0 }} aria-labelledby="map-title">
        <div className="wrap">
          <h2 id="map-title" className="display h-sub" style={{ marginBottom: 24 }}>Nous trouver</h2>
          <MapBlock />
        </div>
      </section>
    </div>
  );
}
