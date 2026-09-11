import React, { useEffect, useState } from 'react';
import { Check, Wallet, RotateCcw, Leaf, Timer, KeyRound, Gauge, Banknote, PenLine, CalendarClock } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { SITE } from '../data/site.js';
import { FORMATIONS } from '../data/formations.js';
import { Button, PageHero, CtaBand } from '../components/UI.jsx';
import Illustration from '../components/Illustrations.jsx';

const EXTRA_ICONS = { RotateCcw, Leaf, Timer, KeyRound, Gauge };
const shortTitle = (t) => t.replace(' (AAC)', '').replace(' & autres formules', '');

function FormationSection({ f, i }) {
  const theme = i % 2 === 0 ? 'theme-beton' : 'theme-blanc';
  return (
    <section id={f.id} className={`section formation ${theme}`} aria-labelledby={`${f.id}-title`}>
      <span className="formation-mark" aria-hidden="true">{f.mark}</span>
      <div className="wrap formation-grid">
        <div className="formation-main">
          <div className="formation-head">
            <span className="tag">{f.tag}</span>
            <h2 id={`${f.id}-title`} className="display h-section" data-reveal>{f.title}</h2>
            <p className="lead" data-reveal>{f.intro}</p>
          </div>

          {f.audience && (
            <div data-reveal>
              <h3 className="block-title">À qui s’adresse la formation&nbsp;?</h3>
              <ul className="checks">{f.audience.map((a) => <li key={a}><Check aria-hidden="true" /><span>{a}</span></li>)}</ul>
            </div>
          )}

          {f.steps && (
            <div data-reveal>
              <h3 className="block-title">Déroulement</h3>
              <ol className="steps">{f.steps.map((s) => <li key={s.t}><b>{s.t}</b><span>{s.d}</span></li>)}</ol>
            </div>
          )}

          {f.blocks && (
            <div data-reveal>
              <h3 className="block-title">Comment on vous prépare</h3>
              <ul className="steps steps--plain">{f.blocks.map((s) => <li key={s.t}><b>{s.t}</b><span>{s.d}</span></li>)}</ul>
            </div>
          )}

          {f.advantages && (
            <div data-reveal>
              <h3 className="block-title">Les avantages</h3>
              <ul className="checks">{f.advantages.map((a) => <li key={a}><Check aria-hidden="true" /><span>{a}</span></li>)}</ul>
            </div>
          )}

          {f.extras && (
            <ul className="extras">
              {f.extras.map((e, k) => {
                const Icon = EXTRA_ICONS[e.icon] || Gauge;
                return (
                  <li key={e.t} className="extra" data-reveal style={{ '--d': `${k * 70}ms` }}>
                    <Icon aria-hidden="true" />
                    <h3 className="h-card">{e.t}</h3>
                    <p className="muted">{e.d}</p>
                  </li>
                );
              })}
            </ul>
          )}

          {f.facts && (
            <div data-reveal>
              <h3 className="block-title">Informations pratiques</h3>
              <div className="facts">{f.facts.map((x) => <div className="fact" key={x.l}><b>{x.v}</b><span>{x.l}</span></div>)}</div>
              {f.note && <p className="small muted" style={{ marginTop: 12 }}>{f.note}</p>}
            </div>
          )}

          <div data-reveal>
            <Button to={`/contact?sujet=${f.subject}`} variant="nuit">Je veux en savoir plus</Button>
          </div>
        </div>

        <aside className="formation-aside" aria-label={`Tarifs ${shortTitle(f.title)}`}>
          <div className="illus-card" data-reveal><Illustration name={f.illus} /></div>
          <div className="price" data-reveal style={{ '--d': '100ms' }}>
            <div className="price-head">
              <h3 className="h-card">Tarifs</h3>
              <Wallet aria-hidden="true" style={{ color: 'var(--bande)' }} />
            </div>
            {f.prices.map((p) => (
              <div className="price-row" key={p.label}>
                <span>{p.label}{p.detail && <small>{p.detail}</small>}</span>
                <b>{p.price}</b>
              </div>
            ))}
            <p className="price-note">Tarifs TTC indicatifs, susceptibles d’évoluer. Forfaits sur devis, selon votre évaluation de départ.</p>
            <Button to={`/contact?sujet=${f.subject}`} block>Demander un devis</Button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function Formations() {
  const [active, setActive] = useState(FORMATIONS[0].id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    FORMATIONS.forEach((f) => { const el = document.getElementById(f.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">
      <PageHero
        crumbs={[{ label: 'Nos formations' }]}
        title="Nos formations"
        lead="Du code au perfectionnement, choisissez votre route. Boîte manuelle ou automatique, dès 15 ans ou à tout âge."
        aside={<div className="illus-card"><Illustration name="supervisee" /></div>}
      >
        <div className="hero-actions">
          <Button to="/contact?sujet=inscription">Je m’inscris</Button>
          <Button to={SITE.phoneHref} variant="ghost" signal={false}>{SITE.phone}</Button>
        </div>
      </PageHero>

      <nav className="subnav" aria-label="Accès rapide aux formations">
        <div className="wrap subnav-inner">
          {FORMATIONS.map((f) => (
            <Link key={f.id} to={`/formations#${f.id}`} className={active === f.id ? 'is-active' : ''}>{shortTitle(f.title)}</Link>
          ))}
        </div>
      </nav>

      {FORMATIONS.map((f, i) => <FormationSection key={f.id} f={f} i={i} />)}

      <section className="section theme-blanc" style={{ paddingTop: 0 }} aria-label="Moyens de paiement">
        <div className="wrap">
          <div className="pay-band" data-reveal>
            <div style={{ display: 'grid', gap: 6 }}>
              <h2 className="h-card">Payer simplement</h2>
              <p className="muted">Plusieurs moyens de paiement pour avancer à votre rythme. Parlons-en lors de l’inscription.</p>
            </div>
            <ul className="pay-list">
              <li><PenLine aria-hidden="true" />Chèque</li>
              <li><Banknote aria-hidden="true" />Espèces</li>
              <li><CalendarClock aria-hidden="true" />Facilités de paiement</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
