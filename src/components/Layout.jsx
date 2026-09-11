import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail, X } from 'lucide-react';
import { Link, useRouter } from '../lib/router.jsx';
import { useScrolled, formatRanges } from '../lib/hooks.js';
import { SITE, NAV, DAYS } from '../data/site.js';
import { FORMATIONS } from '../data/formations.js';
import { Crest, Logo, TikTokIcon } from './Brand.jsx';
import { Button } from './UI.jsx';

export function Nav() {
  const { pathname } = useRouter();
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { const a = document.querySelector('#menu-mobile .menu-list a'); if (a) a.focus(); }, 250);
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); burgerRef.current && burgerRef.current.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; clearTimeout(t); window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Navigation principale">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link">{item.label}</Link>
            ))}
          </nav>
          <Button to="/contact?sujet=inscription" size="sm" className="nav-cta">Je m’inscris</Button>
          <button ref={burgerRef} className="nav-burger" aria-label="Ouvrir le menu" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(true)}>
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
        <div ref={barRef} className="nav-progress" aria-hidden="true" />
      </header>

      <div id="menu-mobile" className={`menu${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="menu-top">
          <Logo onClick={() => setOpen(false)} />
          <button className="menu-close" aria-label="Fermer le menu" onClick={() => { setOpen(false); burgerRef.current && burgerRef.current.focus(); }}>
            <X aria-hidden="true" />
          </button>
        </div>
        <ul className="menu-list">
          {NAV.map((item, i) => (
            <li key={item.to}>
              <Link to={item.to} style={{ '--i': i }} tabIndex={open ? 0 : -1}>{item.full}</Link>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <Button to="/contact?sujet=inscription" tabIndex={open ? 0 : -1}>Je m’inscris</Button>
          <Button to={SITE.phoneHref} variant="ghost" signal={false} icon={<Phone aria-hidden="true" />} tabIndex={open ? 0 : -1}>Appeler le {SITE.phone}</Button>
          <p className="menu-meta"><span>{SITE.address.street}, {SITE.address.city}</span><span>{SITE.signature}</span></p>
        </div>
      </div>
    </>
  );
}

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, tiktok: TikTokIcon };

export function Socials() {
  return (
    <ul className="socials">
      {SITE.socials.map((s) => {
        const Icon = SOCIAL_ICONS[s.id];
        const available = !!s.url;
        return (
          <li key={s.id}>
            <a className="social" href={available ? s.url : undefined} target="_blank" rel="noopener noreferrer" aria-label={available ? `${s.label} de Royale Auto-école` : `${s.label} (lien à ajouter)`} aria-disabled={!available}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  const year = 2026;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>{SITE.slogan}</p>
            <Socials />
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h2>Navigation</h2>
              <ul>{NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.full}</Link></li>)}</ul>
            </div>
            <div className="footer-col">
              <h2>Formations</h2>
              <ul>{FORMATIONS.map((f) => <li key={f.id}><Link to={`/formations#${f.id}`}>{f.title}</Link></li>)}</ul>
            </div>
            <div className="footer-col">
              <h2>Informations</h2>
              <ul>
                <li><Link to="/reglementation#documents">Documents à fournir</Link></li>
                <li><Link to="/securite-routiere#quiz">Mini quiz</Link></li>
                <li><Link to="/mentions-legales">Mentions légales</Link></li>
                <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
                <li><Link to="/cookies">Gestion des cookies</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h2>Contact</h2>
              <ul>
                <li><a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">{SITE.address.street}<br />{SITE.address.postalCode} {SITE.address.city}</a></li>
                <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
                {SITE.email && <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
                <li>Accueil du lundi au vendredi, {formatRanges(SITE.hours.office[0])}</li>
                <li>Samedi, {formatRanges(SITE.hours.office[5])}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="footer-giant" aria-hidden="true">Royale</p>
      <div className="wrap footer-bottom">
        <p>© {year} {SITE.name}, SIREN {SITE.company.siren}</p>
        <nav aria-label="Liens légaux">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <Link to="/cookies">Cookies</Link>
        </nav>
      </div>
    </footer>
  );
}

export function MobileBar() {
  const { pathname } = useRouter();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 140;
      setHidden(nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
  return (
    <div className={`mbar${hidden ? ' is-hidden' : ''}`}>
      <Button to={SITE.phoneHref} variant="ghost" signal={false} icon={<Phone aria-hidden="true" />}>Appeler</Button>
      <Button to="/contact?sujet=inscription">Je m’inscris</Button>
    </div>
  );
}

export function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const [speed, setSpeed] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    const finish = () => doneRef.current && doneRef.current();
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { finish(); return undefined; }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 950);
      setSpeed(Math.round(130 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t1 = setTimeout(() => setLeaving(true), 1250);
    const t2 = setTimeout(finish, 2000);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const ticks = Array.from({ length: 14 }).map((_, i) => {
    const a = ((135 + i * (270 / 13)) * Math.PI) / 180;
    return <line key={i} x1={100 + 66 * Math.cos(a)} y1={100 + 66 * Math.sin(a)} x2={100 + (i % 2 ? 72 : 58) * Math.cos(a)} y2={100 + (i % 2 ? 72 : 58) * Math.sin(a)} stroke="rgba(255,255,255,.5)" strokeWidth={i % 2 ? 1.5 : 3} />;
  });
  return (
    <div className={`loader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="loader-box">
        <div style={{ position: 'relative' }}>
          <svg className="loader-gauge" viewBox="0 0 200 200">
            <path d="M43.4 156.6A80 80 0 1 1 156.6 156.6" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" strokeLinecap="round" />
            <path className="loader-arc" d="M43.4 156.6A80 80 0 1 1 156.6 156.6" fill="none" stroke="#F6B800" strokeWidth="8" strokeLinecap="round" />
            {ticks}
            <g className="loader-needle"><path d="M92 100 L160 98.5 L160 101.5 Z" fill="#fff" /></g>
            <circle cx="100" cy="100" r="6" fill="#0E1422" stroke="#fff" strokeWidth="2" />
          </svg>
          <p className="loader-speed">{speed}<span className="loader-unit">km/h</span></p>
        </div>
        <div className="loader-brand logo" style={{ pointerEvents: 'none' }}>
          <Crest />
          <span className="logo-word">
            <span className="logo-script">Royale</span>
            <span className="logo-sub">AUTO-ÉCOLE</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function PageCover({ phase }) {
  return (
    <div className={`cover${phase !== 'idle' ? ` is-${phase}` : ''}`} aria-hidden="true">
      <div className="cover-panel"><Crest /></div>
    </div>
  );
}

export { DAYS };
