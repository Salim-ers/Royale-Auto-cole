import React, { useState } from 'react';
import { BadgeCheck, Leaf, Wallet } from 'lucide-react';
import { SITE } from '../data/site.js';
import { Crest } from '../components/Brand.jsx';
import { Button, Photo, PageHero, CtaBand } from '../components/UI.jsx';

const GEARS = [
  { x: 20, y: 15 },
  { x: 20, y: 85 },
  { x: 50, y: 15 },
  { x: 50, y: 85 },
  { x: 80, y: 15 },
];

function initials(name) {
  return name.split(/\s+/).map((p) => p[0]).join('').replace(/[^A-Z\u00C0-\u00DD]/gi, '').slice(0, 2).toUpperCase();
}

function Gearbox() {
  const [gear, setGear] = useState(0);
  const value = SITE.values[gear];
  const pos = GEARS[gear];
  return (
    <div className="gearbox">
      <div className="gate" data-reveal>
        <svg viewBox="0 0 300 200" aria-hidden="true">
          <path d="M60 30v140M150 30v140M240 30v70M60 100h180" stroke="rgba(255,255,255,.1)" strokeWidth="34" strokeLinecap="round" fill="none" />
          <path d="M60 30v140M150 30v140M240 30v70M60 100h180" stroke="#070A11" strokeWidth="26" strokeLinecap="round" fill="none" />
        </svg>
        <span className="knob" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} aria-hidden="true" />
        {SITE.values.slice(0, GEARS.length).map((v, i) => (
          <button
            key={v.t}
            className="gear"
            style={{ left: `${GEARS[i].x}%`, top: `${GEARS[i].y}%` }}
            aria-pressed={gear === i}
            aria-label={`Rapport ${i + 1} : ${v.t}`}
            onClick={() => setGear(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="value-panel" aria-live="polite">
        <div key={gear} style={{ display: 'grid', gap: 16 }}>
          <h3 className="display h-section">{value.t}</h3>
          <p className="lead" style={{ color: 'var(--alu-2)' }}>{value.d}</p>
        </div>
        <div className="value-list" role="group" aria-label="Choisir une valeur">
          {SITE.values.map((v, i) => (
            <button key={v.t} className="seg" style={{ background: gear === i ? 'var(--bande)' : 'transparent', color: gear === i ? 'var(--nuit)' : 'var(--blanc)', borderColor: gear === i ? 'var(--bande)' : 'rgba(255,255,255,.2)' }} aria-pressed={gear === i} onClick={() => setGear(i)}>
              {v.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { images } = SITE;
  return (
    <div className="page">
      <PageHero
        crumbs={[{ label: 'Qui sommes-nous\u00a0?' }]}
        title="Une auto-école, mais surtout une équipe."
        lead="Royale Auto-école a ouvert route de Paris, à Breuil-le-Vert. Un lieu où l’on se sent bien, une équipe disponible et une idée simple : vous faire progresser sans pression."
        aside={
          <div className="tile" style={{ aspectRatio: '4 / 5', borderRadius: 'var(--r-xl)' }}>
            <Photo src={images.devanture} alt="Devanture de Royale Auto-école à Breuil-le-Vert" label="Devanture de l’agence" hint="public/images/devanture.webp" />
          </div>
        }
      >
        <div className="hero-actions">
          <Button to="/contact">Passer nous voir</Button>
        </div>
      </PageHero>

      <section className="section theme-beton" aria-labelledby="story-title">
        <div className="wrap story">
          <div className="story-text">
            <h2 id="story-title" className="display h-section" data-reveal>Née à Breuil-le-Vert</h2>
            <p className="lead" data-reveal>Royale Auto-école est créée en mars 2025, au {SITE.address.street}. Une devanture noire et or qu’on repère de loin, une voiture aux bandes jaunes et, à l’intérieur, un salon plutôt qu’une salle d’attente.</p>
            <p data-reveal>L’agence est installée sur la même route que le centre d’examen du code La Poste de Breuil-le-Vert. Pratique pour passer de la révision à l’examen.</p>
            <p data-reveal>Notre philosophie tient dans la formule qui accompagne l’auto-école sur Instagram : <strong>{SITE.signature.toLowerCase()}</strong>. Un endroit où l’on peut poser toutes ses questions, se tromper, recommencer et progresser à son rythme.</p>
          </div>
          <aside className="idcard" data-reveal aria-labelledby="idcard-title">
            <h3 id="idcard-title" className="h-card" style={{ marginBottom: 6 }}>Carte d’identité</h3>
            <dl>
              <div><dt>Création</dt><dd>Mars 2025</dd></div>
              <div><dt>Adresse</dt><dd>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</dd></div>
              <div><dt>Formations</dt><dd>9 formules, du code au perfectionnement</dd></div>
              <div><dt>Réseau</dt><dd>Adhérent {SITE.network}</dd></div>
              <div><dt>Avis</dt><dd>{SITE.ratings.google.score.toLocaleString('fr-FR', { minimumFractionDigits: 1 })} sur Google, {SITE.ratings.google.count} avis</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section theme-nuit" aria-labelledby="history-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="history-title" className="display h-section" data-reveal>Notre histoire, borne après borne</h2>
          </div>
          <ol className="milestones" style={{ '--n': SITE.history.length }}>
            {SITE.history.map((m, i) => (
              <li key={m.title} className="milestone" data-reveal style={{ '--d': `${i * 110}ms` }}>
                <p className="milestone-when">{m.when}</p>
                <h3 className="h-card">{m.title}</h3>
                <p className="muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section theme-beton" aria-labelledby="team-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="team-title" className="display h-section" data-reveal>L’équipe</h2>
            <p className="lead muted" data-reveal>Des visages que vous retrouverez de la première leçon au jour de l’examen.</p>
          </div>
          <ul className="team">
            {SITE.team.map((m, i) => (
              <li key={m.name} className={`member${m.placeholder ? ' member--placeholder' : ''}`} data-reveal style={{ '--d': `${i * 90}ms` }}>
                <div className="member-photo">
                  {m.photo ? <Photo src={m.photo} alt={`Portrait de ${m.name}`} label={m.name} /> : <span className="member-initials" aria-hidden="true">{m.placeholder ? '?' : initials(m.name)}</span>}
                </div>
                <div className="member-body">
                  <h3 className="h-card">{m.name}</h3>
                  <p style={{ color: 'var(--alu-2)' }}>{m.role}</p>
                  <div className="chips">{m.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section theme-nuit" aria-labelledby="values-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="values-title" className="display h-section" data-reveal>Nos valeurs, rapport par rapport</h2>
            <p className="lead muted" data-reveal>Passez les vitesses : chaque rapport correspond à une valeur qui guide nos leçons.</p>
          </div>
          <Gearbox />
        </div>
      </section>

      <section className="section theme-beton" aria-labelledby="gallery-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="gallery-title" className="display h-section" data-reveal>L’agence en images</h2>
          </div>
          <div className="gallery">
            {[
              { src: images.voiture, alt: 'Voiture école noire aux bandes jaunes devant l’agence', label: 'La voiture Royale', hint: 'public/images/voiture.webp' },
              { src: images.salon, alt: 'Salon avec fauteuils club en cuir', label: 'Le salon', hint: 'public/images/salon.webp' },
              { src: images.detente, alt: 'Espace détente avec mur végétal', label: 'L’espace détente', hint: 'public/images/espace-detente.webp' },
              { src: images.salleCode, alt: 'Salle de code avec écran et mur jaune', label: 'La salle de code', hint: 'public/images/salle-code.webp' },
            ].map((p, i) => (
              <div key={p.label} className="tile" data-reveal style={{ '--d': `${i * 80}ms` }}>
                <Photo {...p} />
                <span className="tile-caption glass">{p.label}</span>
              </div>
            ))}
          </div>
          <ul className="engage" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            <li data-reveal><BadgeCheck aria-hidden="true" /><h3 className="h-card">Adhérent {SITE.network}</h3><p className="muted">Membre d’une organisation professionnelle de l’éducation routière.</p></li>
            <li data-reveal style={{ '--d': '90ms' }}><Leaf aria-hidden="true" /><h3 className="h-card">Éco-conduite au programme</h3><p className="muted">Anticiper et rouler souple : bon pour la sécurité, le budget et l’environnement.</p></li>
            <li data-reveal style={{ '--d': '180ms' }}><Wallet aria-hidden="true" /><h3 className="h-card">Facilités de paiement</h3><p className="muted">Chèque, espèces et facilités de paiement : parlons-en ensemble.</p></li>
          </ul>
        </div>
      </section>

      <CtaBand title="Venez nous rencontrer" lead={`${SITE.address.street}, ${SITE.address.city}. Du lundi au samedi.`} />
    </div>
  );
}
