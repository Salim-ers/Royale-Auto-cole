import React, { useState } from 'react';
import { Check, Info, Fuel, ClipboardCheck, CalendarCheck, Car, Users, Eye, BookOpen, Flag, FileText, HeartHandshake } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { SITE } from '../data/site.js';
import { PROFILES, DOCUMENTS, RULES } from '../data/reglementation.js';
import { Button, PageHero, Accordion, CtaBand } from '../components/UI.jsx';
import Illustration from '../components/Illustrations.jsx';

const ICONS = { ClipboardCheck, CalendarCheck, Car, Users, Eye, BookOpen, Flag, FileText, HeartHandshake };

function FuelGauge({ ratio }) {
  const L = Math.PI * 90;
  return (
    <svg className="fuel-dial" viewBox="0 0 240 150" aria-hidden="true">
      <path d="M30 120a90 90 0 0 1 180 0" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12" strokeLinecap="round" />
      <path d="M30 120a90 90 0 0 1 180 0" fill="none" stroke="#F6B800" strokeWidth="12" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - ratio)} style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.16,1,.3,1)' }} />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const a = Math.PI + t * Math.PI;
        return <line key={t} x1={120 + 70 * Math.cos(a)} y1={120 + 70 * Math.sin(a)} x2={120 + 58 * Math.cos(a)} y2={120 + 58 * Math.sin(a)} stroke="rgba(255,255,255,.6)" strokeWidth={t === 0.5 ? 3 : 2} />;
      })}
      <text x="18" y="146" fill="#FF6B6B" fontFamily="inherit" fontWeight="800" fontSize="16">E</text>
      <text x="210" y="146" fill="#fff" fontFamily="inherit" fontWeight="800" fontSize="16">F</text>
      <g className="fuel-needle" style={{ transform: `rotate(${180 + 180 * ratio}deg)` }}>
        <path d="M112 120 190 118.5v3z" fill="#fff" />
      </g>
      <circle cx="120" cy="120" r="9" fill="#0E1422" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

function RuleContent({ rule }) {
  return (
    <>
      <div className="chips">{rule.chips.map(([b, t]) => <span key={b + t} className="chip"><b>{b}</b>{t}</span>)}</div>
      {rule.body.map((block, i) => (block.p ? <p key={i}>{block.p}</p> : <ul key={i}>{block.list.map((li) => <li key={li}>{li}</li>)}</ul>))}
    </>
  );
}

export default function Reglementation() {
  const [profile, setProfile] = useState('18');
  const [hosted, setHosted] = useState(false);
  const [checked, setChecked] = useState({});
  const docs = DOCUMENTS.filter((d) => d.who.includes(profile) && (!d.hosted || hosted));
  const done = docs.filter((d) => checked[d.id]).length;
  const ratio = docs.length ? done / docs.length : 0;

  return (
    <div className="page">
      <PageHero
        crumbs={[{ label: 'Réglementation & documents' }]}
        title="Tout ce qu’il faut savoir avant de commencer."
        titleClass="h-article"
        lead="Documents, âges, formules et examens : l’essentiel de la réglementation du permis B, expliqué simplement."
        aside={<div className="illus-card"><Illustration name="code" /></div>}
      >
        <div className="hero-actions">
          <Button to="/reglementation#documents" variant="bande">Préparer mon dossier</Button>
          <Button to="/reglementation#regles" variant="ghost" signal={false}>Lire la réglementation</Button>
        </div>
      </PageHero>

      <nav className="subnav" aria-label="Dans cette page">
        <div className="wrap subnav-inner">
          <Link to="/reglementation#documents">Documents à fournir</Link>
          <Link to="/reglementation#regles">Réglementation</Link>
          <Link to="/reglementation#question">Une question&nbsp;?</Link>
        </div>
      </nav>

      <section id="documents" className="section theme-beton" aria-labelledby="docs-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="docs-title" className="display h-section" data-reveal>Documents à fournir</h2>
            <p className="lead muted" data-reveal>Indiquez votre situation, la liste s’adapte. Cochez chaque pièce prête : la jauge se remplit.</p>
          </div>
          <div className="docs">
            <div>
              <div className="profile">
                <p className="block-title" id="profile-label" style={{ margin: 0 }}>Votre âge à l’inscription</p>
                <div className="segmented" role="group" aria-labelledby="profile-label">
                  {PROFILES.map((p) => (
                    <button key={p.id} className="seg" aria-pressed={profile === p.id} onClick={() => setProfile(p.id)}>{p.label}</button>
                  ))}
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={hosted} onChange={(e) => setHosted(e.target.checked)} />
                  <span className="toggle-ui" aria-hidden="true" />
                  Je suis hébergé(e) chez un proche
                </label>
              </div>
              <ul className="doclist" key={`${profile}-${hosted}`}>
                {docs.map((d, i) => (
                  <li key={d.id} className="doc" style={{ '--i': i }}>
                    <label>
                      <input type="checkbox" checked={!!checked[d.id]} onChange={() => setChecked((c) => ({ ...c, [d.id]: !c[d.id] }))} />
                      <span className="doc-box" aria-hidden="true"><Check /></span>
                      <span className="doc-text"><b>{d.title}</b><span>{d.hint}</span></span>
                      <span className="doc-who">{d.badge}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="fuel" aria-label="Avancement du dossier">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Fuel aria-hidden="true" style={{ color: 'var(--bande)' }} />
                <p className="h-card">Votre dossier</p>
              </div>
              <FuelGauge ratio={ratio} />
              <p className="fuel-count" aria-live="polite">{done}/{docs.length}<small>{done === docs.length && docs.length ? 'Dossier prêt pour la route' : 'documents prêts'}</small></p>
              <div className="notice"><Info aria-hidden="true" /><p>La liste peut varier selon votre situation. Contactez-nous pour vérifier votre dossier.</p></div>
              <Button to="/contact?sujet=dossier" block>Faire vérifier mon dossier</Button>
            </aside>
          </div>
        </div>
      </section>

      <section id="regles" className="section theme-blanc" aria-labelledby="rules-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="rules-title" className="display h-section" data-reveal>Les règles, en clair</h2>
            <p className="lead muted" data-reveal>Les questions que tout le monde se pose, avec les chiffres qui comptent.</p>
          </div>
          <Accordion
            items={RULES.map((r) => ({ id: r.id, title: r.title, icon: r.icon, content: <RuleContent rule={r} /> }))}
            renderIcon={(item) => { const Icon = ICONS[item.icon] || Info; return <Icon />; }}
          />
          <p className="sources">
            Informations générales vérifiées en septembre 2026 sur{' '}
            <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/N530" target="_blank" rel="noopener noreferrer">service-public.gouv.fr</a> et{' '}
            <a href="https://permisdeconduire.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">France Titres (ANTS)</a>. Seuls les textes officiels font foi.
          </p>
        </div>
      </section>

      <section id="question" className="section theme-beton" aria-labelledby="question-title">
        <div className="wrap">
          <div className="help-box" data-reveal>
            <div className="stripes" aria-hidden="true"><i /><i /></div>
            <div style={{ position: 'relative', display: 'grid', gap: 14 }}>
              <h2 id="question-title" className="display h-sub">Une question sur votre dossier&nbsp;?</h2>
              <p className="lead" style={{ color: 'var(--alu-2)' }}>L’équipe vous aide à rassembler les bonnes pièces pour un dossier complet.</p>
            </div>
            <div className="help-actions">
              <Button to="/contact?sujet=dossier">Contactez-nous</Button>
              <Button to={SITE.phoneHref} variant="ghost" signal={false}>{SITE.phone}</Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
