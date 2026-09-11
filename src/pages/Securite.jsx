import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { SIGN_CATEGORIES, SIGNS, QUIZ, REFLEXES } from '../data/securite.js';
import { Button, PageHero, CtaBand } from '../components/UI.jsx';
import RoadSign from '../components/RoadSign.jsx';
import { Crest } from '../components/Brand.jsx';
import { Telltale } from '../components/Illustrations.jsx';

function SignsBoard() {
  const [cat, setCat] = useState('all');
  const [flipped, setFlipped] = useState(null);
  const list = cat === 'all' ? SIGNS : SIGNS.filter((s) => s.cat === cat);
  return (
    <>
      <div className="filters" role="group" aria-label="Filtrer les panneaux par famille">
        {SIGN_CATEGORIES.map((c) => {
          const count = c.id === 'all' ? SIGNS.length : SIGNS.filter((s) => s.cat === c.id).length;
          return (
            <button key={c.id} className="seg" aria-pressed={cat === c.id} onClick={() => { setCat(c.id); setFlipped(null); }}>
              {c.label}<span>{count}</span>
            </button>
          );
        })}
      </div>
      <ul className="signs-grid" key={cat}>
        {list.map((s, i) => (
          <li key={s.id} className={`sign-card${flipped === s.id ? ' is-flipped' : ''}`} style={{ '--i': i }}>
            <button className="sign-btn" aria-pressed={flipped === s.id} onClick={() => setFlipped(flipped === s.id ? null : s.id)}>
              <span className="sign-inner">
                <span className="sign-face sign-front">
                  <RoadSign id={s.id} />
                  <b>{s.name}</b>
                  <span className="sign-hint" aria-hidden="true"><RotateCcw /></span>
                </span>
                <span className="sign-face sign-back">
                  <RoadSign id={s.id} />
                  <span style={{ display: 'grid', gap: 6 }}>
                    <b>{s.name}</b>
                    <span className="sign-desc" style={{ fontSize: '.9rem', lineHeight: 1.45, color: 'var(--alu-2)' }}>{s.desc}</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const nextRef = useRef(null);
  const qRef = useRef(null);
  const first = useRef(true);
  const q = QUIZ[idx];
  const answered = picked !== null;
  const correct = answered && picked === q.correct;

  useEffect(() => {
    if (answered && nextRef.current) {
      const btn = nextRef.current.querySelector('button');
      if (btn) btn.focus({ preventScroll: true });
    }
  }, [answered]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (qRef.current) qRef.current.focus({ preventScroll: true });
  }, [idx, finished]);

  const pick = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= QUIZ.length) setFinished(true);
    else { setIdx(idx + 1); setPicked(null); }
  };
  const restart = () => { setIdx(0); setPicked(null); setScore(0); setFinished(false); };

  const message = score === QUIZ.length ? 'Sans faute. Vous êtes prêt(e) pour la suite.' : score >= QUIZ.length - 2 ? 'Beau score. Encore quelques révisions et c’est parfait.' : 'Un bon début : le code, ça se travaille, et on est là pour ça.';

  return (
    <div className="quiz">
      <div className="quiz-visual" aria-hidden="true">
        {finished ? <Crest className="q-sign" /> : q.sign ? <RoadSign key={idx} id={q.sign} className="q-sign" /> : <div key={idx} className="q-tell"><Telltale name={q.visual} /></div>}
      </div>
      <div className="quiz-body">
        {!finished ? (
          <>
            <div className="quiz-progress">
              <span>Question {idx + 1} sur {QUIZ.length}</span>
              <span className="quiz-bar"><i style={{ transform: `scaleX(${(idx + (answered ? 1 : 0)) / QUIZ.length})` }} /></span>
            </div>
            <h3 className="quiz-q" ref={qRef} tabIndex={-1}>{q.q}</h3>
            <div className="quiz-answers">
              {q.answers.map((a, i) => {
                const state = !answered ? '' : i === q.correct ? ' is-right' : i === picked ? ' is-wrong' : ' is-dim';
                return (
                  <button key={a} className={`quiz-answer${state}`} disabled={answered} onClick={() => pick(i)}>
                    <span className="quiz-letter">{'ABC'[i]}</span>
                    <span>{a}</span>
                    {answered && i === q.correct && <CheckCircle2 aria-label="Bonne réponse" />}
                    {answered && i === picked && i !== q.correct && <XCircle aria-label="Votre réponse" />}
                    {correct && i === q.correct && (
                      <span className="burst" aria-hidden="true">
                        {Array.from({ length: 12 }).map((_, k) => <i key={k} style={{ '--a': `${k * 30}deg` }} />)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`quiz-feedback ${correct ? 'good' : 'bad'}`} role="status">
                <b>{correct ? 'Bonne réponse\u00a0!' : 'Pas tout à fait.'}</b>
                <p>{q.explain}</p>
              </div>
            )}
            {answered && (
              <div ref={nextRef}>
                <Button onClick={next}>{idx + 1 >= QUIZ.length ? 'Voir mon score' : 'Question suivante'}</Button>
              </div>
            )}
          </>
        ) : (
          <div className="quiz-score">
            <p style={{ color: 'var(--alu-2)' }}>Votre score</p>
            <strong ref={qRef} tabIndex={-1}>{score}/{QUIZ.length}</strong>
            <p className="lead">{message}</p>
            <div className="hero-actions">
              <Button onClick={restart} variant="ghost" signal={false} icon={<RotateCcw aria-hidden="true" />}>Recommencer</Button>
              <Button to="/formations#code-de-la-route">Préparer le code avec nous</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Securite() {
  return (
    <div className="page">
      <PageHero
        crumbs={[{ label: 'Sécurité routière' }]}
        title="La route, ça s’apprend. La sécurité, ça se vit."
        titleClass="h-article"
        lead="Panneaux interactifs, mini quiz et réflexes essentiels : révisez en jouant, puis venez pratiquer avec nous."
        aside={
          <div className="sign-stack" aria-hidden="true">
            <RoadSign id="stop" />
            <RoadSign id="prioritaire" />
            <RoadSign id="limite-50" />
          </div>
        }
      >
        <div className="hero-actions">
          <Button to="/securite-routiere#quiz">Tester mes réflexes</Button>
          <Button to="/securite-routiere#panneaux" variant="ghost" signal={false}>Voir les panneaux</Button>
        </div>
      </PageHero>

      <section id="panneaux" className="section theme-beton" aria-labelledby="signs-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="signs-title" className="display h-section" data-reveal>Les panneaux</h2>
            <p className="lead muted" data-reveal>Chaque famille a sa forme et sa couleur. Touchez un panneau pour le retourner et lire sa signification.</p>
          </div>
          <SignsBoard />
        </div>
      </section>

      <section id="quiz" className="section theme-blanc" aria-labelledby="quiz-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="quiz-title" className="display h-section" data-reveal>Que feriez-vous dans cette situation&nbsp;?</h2>
            <p className="lead muted" data-reveal>{QUIZ.length} questions, 3 réponses possibles. Une explication s’affiche après chaque choix.</p>
          </div>
          <Quiz />
        </div>
      </section>

      <section id="reflexes" className="section theme-nuit" aria-labelledby="reflexes-title">
        <div className="wrap">
          <div className="section-head section-head--split">
            <h2 id="reflexes-title" className="display h-section" data-reveal>Les réflexes qui sauvent</h2>
            <p className="lead muted" data-reveal>Comme les témoins du tableau de bord au démarrage : six rappels qui s’allument avant chaque trajet.</p>
          </div>
          <ul className="telltales">
            {REFLEXES.map((r, i) => (
              <li key={r.id} className="telltale" data-reveal style={{ '--c': r.color, '--d': `${i * 120}ms` }}>
                <span className="telltale-icon"><Telltale name={r.icon} /></span>
                <h3 className="h-card">{r.title}</h3>
                <p className="telltale-rule">{r.rule}</p>
                <span className="telltale-sanction">{r.sanction}</span>
              </li>
            ))}
          </ul>
          <p className="sources" style={{ color: 'var(--alu)' }}>
            Pour aller plus loin : <a href="https://www.securite-routiere.gouv.fr/" target="_blank" rel="noopener noreferrer">securite-routiere.gouv.fr</a>. Envie de pratiquer ? <Link to="/contact" style={{ textDecoration: 'underline' }}>Réservez une leçon</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
