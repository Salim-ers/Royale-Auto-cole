import React, { useState } from 'react';
import { CalendarCheck, Clock } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { formatDate } from '../lib/hooks.js';
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles.js';
import { PageHero, CtaBand } from '../components/UI.jsx';
import { Signal } from '../components/Brand.jsx';
import Illustration from '../components/Illustrations.jsx';

export function ArticleCard({ a, featured = false, i = 0, headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <article className={`acard${featured ? ' acard--featured' : ''}`} style={{ '--i': i }}>
      <div className="acard-media"><Illustration name={a.cover} /></div>
      <div className="acard-body">
        <span className="tag tag--light">{a.category}</span>
        <H className={featured ? 'display h-sub' : 'h-card'}>
          <Link to={`/conseils/${a.slug}`} className="fcard-link">{a.title}</Link>
        </H>
        <p className="muted">{a.excerpt}</p>
        <div className="acard-meta">
          <span><CalendarCheck aria-hidden="true" /><time dateTime={a.date}>{formatDate(a.date)}</time></span>
          <span><Clock aria-hidden="true" />{a.readTime} min de lecture</span>
        </div>
        <span className="acard-read" aria-hidden="true">Lire<Signal /></span>
      </div>
    </article>
  );
}

export default function Conseils() {
  const [cat, setCat] = useState('Tous');
  const list = cat === 'Tous' ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
  return (
    <div className="page">
      <PageHero
        crumbs={[{ label: 'Conseils & actualités' }]}
        title="Conseils & actualités"
        lead="Des astuces concrètes pour réussir votre code, votre conduite et le jour de l’examen."
        aside={<div className="illus-card"><Illustration name="examen" /></div>}
      />
      <section className="section theme-beton" aria-label="Articles">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filtrer les articles">
            {['Tous', ...ARTICLE_CATEGORIES].map((c) => (
              <button key={c} className="seg" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="articles" key={cat}>
            {list.map((a, i) => <ArticleCard key={a.slug} a={a} i={i} featured={i === 0 && cat === 'Tous'} />)}
          </div>
        </div>
      </section>
      <CtaBand title={'Une question avant de vous lancer\u00a0?'} lead="L’équipe vous répond du lundi au samedi." />
    </div>
  );
}
