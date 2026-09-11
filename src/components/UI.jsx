import React, { useId, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from '../lib/router.jsx';
import { useCountUp, useInView, useOpenStatus } from '../lib/hooks.js';
import { SITE } from '../data/site.js';
import { Crest, Signal } from './Brand.jsx';

export function Button({ to, variant = 'bande', size, block, children, signal = true, icon, className = '', ...rest }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ''}${block ? ' btn--block' : ''} ${className}`;
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {signal && <Signal />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <button className={cls} {...rest}>{inner}</button>;
}

/* Photo avec repli graphique si le fichier n'est pas encore en ligne */
export function Photo({ src, alt, label, hint }) {
  const [failed, setFailed] = useState(!src);
  return (
    <figure className="photo">
      {!failed && <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
      {failed && (
        <div className="photo-fallback" role="img" aria-label={alt}>
          <Crest className="" />
          <b>Photo à ajouter</b>
          {hint && <span>{hint}</span>}
        </div>
      )}
    </figure>
  );
}

export function PageHero({ title, lead, crumbs, aside, children, titleClass = 'h-page' }) {
  return (
    <header className="phero">
      <div className="phero-stripes stripes" aria-hidden="true"><i /><i /></div>
      <div className="wrap phero-grid">
        <div className="phero-copy">
          {crumbs && (
            <nav aria-label="Fil d’Ariane">
              <ol className="crumbs">
                <li><Link to="/">Accueil</Link></li>
                {crumbs.map((c) => <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
              </ol>
            </nav>
          )}
          <h1 className={`display ${titleClass} phero-title fade-up`} style={{ '--d': '0.1s' }}>{title}</h1>
          {lead && <p className="lead muted fade-up" style={{ '--d': '0.22s', color: 'var(--alu-2)' }}>{lead}</p>}
          {children && <div className="fade-up" style={{ '--d': '0.34s' }}>{children}</div>}
        </div>
        {aside && <div className="phero-aside fade-up" style={{ '--d': '0.3s' }}>{aside}</div>}
      </div>
    </header>
  );
}

/* Jauge façon compteur de vitesse */
export function Gauge({ value, decimals = 0, suffix = '', fraction = 1, label, sub, active }) {
  const shown = useCountUp(value, { active, decimals });
  const r = 80;
  const len = +(2 * Math.PI * r * 0.75).toFixed(2);
  const point = (deg, rad) => [100 + rad * Math.cos((deg * Math.PI) / 180), 100 + rad * Math.sin((deg * Math.PI) / 180)];
  const [sx, sy] = point(135, r);
  const [ex, ey] = point(45, r);
  const arc = `M${sx.toFixed(2)} ${sy.toFixed(2)}A${r} ${r} 0 1 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
  const ticks = Array.from({ length: 28 }).map((_, i) => {
    const a = 135 + i * 10;
    const major = i % 3 === 0;
    const [x1, y1] = point(a, 64);
    const [x2, y2] = point(a, major ? 54 : 58);
    return <line key={i} className={`gauge-tick${major ? ' major' : ''}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={major ? 2 : 1} />;
  });
  const [suf, unit] = suffix.startsWith('/') ? [suffix, ''] : ['', suffix.trim()];
  return (
    <div className={`gauge${active ? ' is-on' : ''}`}>
      <div className="gauge-dial">
        <svg viewBox="0 0 200 200" aria-hidden="true" style={{ '--len': len, '--f': fraction }}>
          <path className="gauge-track" d={arc} fill="none" strokeWidth="9" strokeLinecap="round" />
          <path className="gauge-value" d={arc} fill="none" strokeWidth="9" strokeLinecap="round" />
          {ticks}
          <g className="gauge-needle">
            <path d="M95 100 L150 98.7 L150 101.3 Z" fill="#fff" />
          </g>
          <circle cx="100" cy="100" r="7" fill="#0E1422" stroke="#fff" strokeWidth="2.5" />
        </svg>
        <p className="gauge-read">{shown}<small>{suf || unit}</small></p>
      </div>
      <p className="gauge-label">{label}</p>
      {sub && <p className="gauge-sub">{sub}</p>}
    </div>
  );
}

export function GaugeCluster({ stats }) {
  const ref = useRef(null);
  const active = useInView(ref, { threshold: 0.35 });
  return (
    <div ref={ref}>
      <div className="cluster">
        {stats.map((s) => <Gauge key={s.label} {...s} active={active} />)}
      </div>
      <p className="cluster-note">Chiffres publics relevés sur Google et Vroomvroom en {SITE.ratings.updated}.</p>
    </div>
  );
}

export function Accordion({ items, renderIcon }) {
  const [open, setOpen] = useState(items[0]?.id);
  const base = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <div className="acc">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className={`acc-item${isOpen ? ' is-open' : ''}`} id={item.id}>
            <h3>
              <button className="acc-btn" aria-expanded={isOpen} aria-controls={`${base}-${item.id}`} id={`${base}-btn-${item.id}`} onClick={() => setOpen(isOpen ? null : item.id)}>
                {renderIcon && <span className="acc-ico" aria-hidden="true">{renderIcon(item)}</span>}
                <span className="h-card">{item.title}</span>
                <span className="acc-plus" aria-hidden="true"><Plus /></span>
              </button>
            </h3>
            <div className="acc-panel" id={`${base}-${item.id}`} role="region" aria-labelledby={`${base}-btn-${item.id}`}>
              <div>
                <div className="acc-content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OpenStatus({ kind = 'office' }) {
  const status = useOpenStatus(kind);
  return (
    <span className={`status${status.open ? ' is-open' : ''}`} aria-live="polite">
      <i aria-hidden="true" />
      {status.label}
    </span>
  );
}

export function CtaBand({ title = 'Prêt(e) à prendre la route\u00a0?', lead = 'Faisons de votre permis une réussite.' }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-road" aria-hidden="true">
        <svg viewBox="0 0 1000 320" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="ctaRoad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1D2536" stopOpacity="0" />
              <stop offset=".35" stopColor="#1D2536" />
              <stop offset="1" stopColor="#252F45" />
            </linearGradient>
          </defs>
          <path d="M470 0h60l470 320H0z" fill="url(#ctaRoad)" />
          <path d="M470 0 0 320M530 0l470 320" stroke="rgba(255,255,255,.35)" strokeWidth="3" />
          <path className="cta-dash" d="M500 0v320" stroke="rgba(255,255,255,.55)" strokeWidth="6" strokeDasharray="28 32" />
          <path d="M488 40 470 320M512 40l18 280" stroke="#F6B800" strokeWidth="9" opacity=".95" />
        </svg>
      </div>
      <div className="wrap">
        <div className="cta-inner">
          <h2 id="cta-title" className="display h-section" data-reveal>{title}</h2>
          <p className="lead" style={{ color: 'var(--alu-2)' }} data-reveal>{lead}</p>
          <div className="hero-actions" data-reveal>
            <Button to="/contact">Contactez Royale Auto-école</Button>
            <Button to={SITE.phoneHref} variant="ghost" signal={false}>{SITE.phone}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
