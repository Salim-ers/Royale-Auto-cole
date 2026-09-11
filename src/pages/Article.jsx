import React from 'react';
import { CalendarCheck, Clock, Lightbulb } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { formatDate } from '../lib/hooks.js';
import { SITE } from '../data/site.js';
import { ARTICLES, getArticle } from '../data/articles.js';
import { Button, PageHero, CtaBand } from '../components/UI.jsx';
import Illustration from '../components/Illustrations.jsx';
import { ArticleCard } from './Conseils.jsx';
import NotFound from './NotFound.jsx';

function Block({ block }) {
  if (block.h2) return <h2>{block.h2}</h2>;
  if (block.list) return <ul>{block.list.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (block.tip) {
    return (
      <aside className="tip">
        <Lightbulb aria-hidden="true" />
        <div style={{ display: 'grid', gap: 10 }}>
          <p>{block.tip}</p>
          {block.link && <Link to={block.link.to} style={{ color: 'var(--bande)', fontWeight: 650 }}>{block.link.label}</Link>}
        </div>
      </aside>
    );
  }
  return <p>{block.p}</p>;
}

export default function Article({ params }) {
  const a = getArticle(params.slug);
  if (!a) return <NotFound />;
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <div className="page">
      <PageHero crumbs={[{ label: 'Conseils', to: '/conseils' }, { label: a.title }]} title={a.title} titleClass="h-article" lead={a.excerpt}>
        <div className="acard-meta" style={{ color: 'var(--alu-2)', alignItems: 'center' }}>
          <span className="tag">{a.category}</span>
          <span><CalendarCheck aria-hidden="true" /><time dateTime={a.date}>{formatDate(a.date)}</time></span>
          <span><Clock aria-hidden="true" />{a.readTime} min de lecture</span>
        </div>
      </PageHero>

      <section className="section theme-beton" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="article-hero-media"><Illustration name={a.cover} /></div>
          <div className="article-layout" style={{ marginTop: 'clamp(40px, 6vw, 80px)' }}>
            <div className="prose">
              {a.content.map((block, i) => <Block key={i} block={block} />)}
            </div>
            <aside className="article-side">
              <div className="price">
                <h2 className="h-card">Besoin d’un coup de main&nbsp;?</h2>
                <p style={{ color: 'var(--alu-2)', marginBottom: 10 }}>L’équipe Royale répond à vos questions sur le code, la conduite et l’examen.</p>
                <Button to="/contact" block>Nous contacter</Button>
                <Button to={SITE.phoneHref} variant="ghost" block signal={false} style={{ marginTop: 8 }}>{SITE.phone}</Button>
              </div>
              <Link to="/conseils" className="text-link" style={{ justifySelf: 'start' }}>Tous les conseils</Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section theme-blanc" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" className="display h-sub" style={{ marginBottom: 28 }}>À lire aussi</h2>
          <div className="articles">
            {related.map((r, i) => <ArticleCard key={r.slug} a={r} i={i} headingLevel={3} />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
