import React, { Fragment, useEffect, useRef } from 'react';
import { MapPin, Phone, HeartHandshake, Sparkles, Users, Trophy } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { SITE } from '../data/site.js';
import { FORMATIONS, TAPE_ITEMS } from '../data/formations.js';
import { Crest, TopCar, TownSign, Stars, Signal } from '../components/Brand.jsx';
import { Button, Photo, GaugeCluster, OpenStatus, CtaBand } from '../components/UI.jsx';
import Illustration from '../components/Illustrations.jsx';
import RoadTimeline from '../components/RoadTimeline.jsx';

const WHY = [
  { icon: HeartHandshake, t: 'Un accompagnement humain', d: 'Chaque élève bénéficie d’un suivi personnalisé, de la première leçon au jour de l’examen.' },
  { icon: Sparkles, t: 'Une pédagogie moderne', d: 'Évaluation de départ sur tablette, code en agence ou en ligne : des outils adaptés à votre rythme.' },
  { icon: Users, t: 'Une équipe à l’écoute', d: 'Des moniteurs disponibles, patients et pédagogues, joignables six jours sur sept.' },
  { icon: Trophy, t: 'Votre réussite avant tout', d: 'Notre objectif : vous donner les connaissances et la confiance nécessaires pour prendre la route.' },
];

const HOW = [
  { title: 'Inscription', text: 'On fait le point sur votre projet et votre dossier, puis on réalise votre évaluation de départ sur tablette.' },
  { title: 'Code de la route', text: 'Entraînement en salle de code ou en ligne, puis examen en centre agréé, sur la même route de Paris.' },
  { title: 'Formation à la conduite', text: 'Des leçons de 50 minutes en boîte manuelle ou automatique, de 7 h à 21 h en semaine.' },
  { title: 'Permis en poche', text: 'L’auto-école vous accompagne le jour de l’examen pratique. Ensuite, la route est à vous.' },
];

const HEADLINE = ['La route vers', 'votre liberté', 'commence ici.'];

function CrownSep() {
  return (
    <svg className="tape-sep" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 18 5 7l5 5 2-7 2 7 5-5 2 11z" fill="currentColor" />
    </svg>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!trackRef.current || window.innerWidth <= 760) return;
      const y = Math.min(window.scrollY, window.innerHeight) * 0.45;
      trackRef.current.style.setProperty('--car-y', `${y.toFixed(1)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const onPointerMove = (e) => {
    const el = heroRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  return (
    <section className="hero" ref={heroRef} onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-h1">
            <span className="hero-kicker fade-up" style={{ '--d': '0.35s' }}>
              <Crest className="" />
              Royale Auto-école, Breuil-le-Vert
            </span>
            <span className="display h-hero hero-title">
              {HEADLINE.map((line, i) => (
                <span className="line" key={line}><span style={{ '--i': i }}>{line}</span></span>
              ))}
            </span>
          </h1>
          <p className="lead hero-sub fade-up" style={{ '--d': '1s' }}>
            Permis B, conduite accompagnée et formation au code de la route à Breuil-le-Vert, dans l’Oise.
          </p>
          <div className="hero-actions fade-up" style={{ '--d': '1.1s' }}>
            <Button to="/formations">Découvrir nos formations</Button>
            <Button to="/contact" variant="ghost">Nous contacter</Button>
          </div>
          <div className="hero-facts fade-up" style={{ '--d': '1.22s' }}>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" />{SITE.address.street}</a>
            <a href={SITE.phoneHref}><Phone aria-hidden="true" />{SITE.phone}</a>
            <OpenStatus />
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-lane">
          <div className="hero-stripes stripes"><i /><i /></div>
          <div className="hero-car-track" ref={trackRef}>
            <div className="hero-car">
              <div className="hero-beams" />
              <TopCar />
            </div>
          </div>
        </div>
        <div className="hero-sign"><div className="hero-sign-inner"><TownSign /></div></div>
        <div className="hero-chip">
          <div className="glass rating-chip">
            <Stars />
            <strong>{SITE.ratings.google.score.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}</strong>
            <span className="small" style={{ color: 'var(--alu-2)' }}>{SITE.ratings.google.count} avis Google</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true"><span className="hero-scroll-line" />Faire défiler</div>
    </section>
  );
}

export default function Home() {
  const { images, ratings, reviews } = SITE;
  return (
    <div className="page">
      <Hero />

      <div className="tape" aria-hidden="true">
        <div className="tape-band tape-band--ghost" />
        <div className="tape-band">
          <div className="tape-track">
            {[0, 1].map((k) => (
              <div className="tape-group" key={k}>
                {TAPE_ITEMS.map((t) => (
                  <Fragment key={t}><span className="tape-item">{t}</span><CrownSep /></Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section theme-nuit" style={{ paddingTop: 'clamp(56px, 7vw, 100px)' }} aria-labelledby="stats-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="stats-title" className="display h-section" data-reveal>Au compteur</h2>
            <p className="lead muted" data-reveal>Des élèves qui recommandent, une équipe joignable six jours sur sept. Voici ce que disent les chiffres publics.</p>
          </div>
          <GaugeCluster stats={SITE.stats} />
        </div>
      </section>

      <section className="section theme-beton" aria-labelledby="why-title">
        <div className="wrap why">
          <div className="why-head">
            <h2 id="why-title" className="display h-section" data-reveal>{'Pas juste apprendre à\u00a0conduire. Apprendre à\u00a0prendre la\u00a0route.'}</h2>
            <div className="why-aside" data-reveal>
              <p className="lead muted">Une équipe derrière vous, du premier cours jusqu’à l’examen.</p>
              <Button to="/qui-sommes-nous" variant="ghost-dark">Découvrir l’équipe</Button>
            </div>
          </div>
          <ul className="why-grid">
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <li key={w.t} className="why-card" data-reveal style={{ '--d': `${i * 90}ms` }}>
                  <span className="why-icon" aria-hidden="true"><Icon /></span>
                  <h3 className="h-card">{w.t}</h3>
                  <p className="muted">{w.d}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section theme-nuit" aria-labelledby="formations-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="formations-title" className="display h-section" data-reveal>Une formule pour chaque route</h2>
            <div data-reveal style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
              <p className="lead muted">Boîte manuelle ou automatique, dès 15 ans ou après des années sans conduire : on construit votre parcours avec vous.</p>
              <Link to="/formations" className="text-link">Voir les 9 formules<Signal /></Link>
            </div>
          </div>
          <div className="bento">
            {FORMATIONS.map((f, i) => (
              <article key={f.id} className={`fcard${f.area === 'b' ? ' fcard--tall' : ''}`} style={{ gridArea: f.area, '--d': `${i * 70}ms` }} data-reveal>
                <div className="fcard-media"><Illustration name={f.illus} variant={f.area === 'b' ? 'tall' : undefined} /></div>
                <div className="fcard-body">
                  <span className="tag">{f.tag}</span>
                  <h3 className="h-card">{f.title}</h3>
                  <p className="muted">{f.short}</p>
                  <Link to={`/formations#${f.id}`} className="fcard-more fcard-link">
                    Découvrir<span className="sr-only"> la formation {f.title}</span><Signal />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-beton" aria-labelledby="how-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="how-title" className="display h-section" data-reveal>Du premier cours au permis en poche</h2>
            <p className="lead muted" data-reveal>Quatre étapes, une seule équipe. Faites défiler : la voiture Royale vous montre le chemin.</p>
          </div>
          <RoadTimeline steps={HOW} />
        </div>
      </section>

      <section className="section theme-nuit" aria-labelledby="agence-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="agence-title" className="display h-section" data-reveal>La safe place du permis</h2>
            <p className="lead muted" data-reveal>Canapés en cuir, mur végétal, salle de code avec écran : chez Royale, on apprend dans un lieu où l’on se sent bien.</p>
          </div>
          <div className="agence-grid">
            <div className="tile tile-a" data-reveal>
              <Photo src={images.devanture} alt="Devanture noire et dorée de Royale Auto-école, route de Paris à Breuil-le-Vert" label="Devanture de l’agence" hint="public/images/devanture.webp" />
              <span className="tile-caption glass">{SITE.address.street}</span>
            </div>
            <div className="tile" data-reveal style={{ '--d': '80ms' }}>
              <Photo src={images.salon} alt="Salon d’accueil avec fauteuils club en cuir et affiches de panneaux routiers" label="Le salon" hint="public/images/salon.webp" />
              <span className="tile-caption glass">Le salon</span>
            </div>
            <div className="tile" data-reveal style={{ '--d': '160ms' }}>
              <Photo src={images.detente} alt="Espace détente avec mur végétal et fauteuils jaunes" label="L’espace détente" hint="public/images/espace-detente.webp" />
              <span className="tile-caption glass">L’espace détente</span>
            </div>
            <div className="tile" data-reveal style={{ '--d': '240ms' }}>
              <Photo src={images.salleCode} alt="Salle de code avec mur jaune, fauteuils et écran" label="La salle de code" hint="public/images/salle-code.webp" />
              <span className="tile-caption glass">La salle de code</span>
            </div>
            <div className="tile tile-info" data-reveal style={{ '--d': '320ms' }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <h3 className="h-card">Le code se passe sur la même route</h3>
                <p>{SITE.examCenter.name}, {SITE.examCenter.address}.</p>
              </div>
              <Link to="/formations#code-de-la-route" className="text-link" style={{ borderColor: 'var(--nuit)', justifySelf: 'start' }}>Préparer le code<Signal /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-beton" aria-labelledby="avis-title">
        <div className="wrap avis">
          <div>
            <h2 id="avis-title" className="display h-section" data-reveal>Ils ont pris la route avec nous</h2>
            <div className="avis-score" style={{ marginTop: 34 }} data-reveal>
              <strong>{ratings.google.score.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}</strong>
              <div style={{ display: 'grid', gap: 6, paddingBottom: 8 }}>
                <Stars label="Note moyenne de 5 sur 5" />
                <span className="muted">Note moyenne sur Google</span>
              </div>
            </div>
            <ul className="avis-sources" data-reveal>
              <li><b>{ratings.google.count} avis</b><span className="muted">sur Google</span></li>
              <li><b>{ratings.vroomvroom.count} avis</b><span className="muted">sur Vroomvroom, dont {ratings.vroomvroom.verified} vérifiés</span></li>
            </ul>
            <div data-reveal><Button to={ratings.google.url} variant="nuit">Lire les avis Google</Button></div>
          </div>
          <div className="reviews">
            {reviews.map((r, i) => (
              <figure key={i} className="review" style={{ '--delay': `${i * -2.6}s` }}>
                <Stars n={r.rating} />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <footer>
                    <span style={{ display: 'grid' }}><b>{r.name}</b><span>{r.source}</span></span>
                    {r.example && <span className="badge-example">Exemple à remplacer</span>}
                  </footer>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
