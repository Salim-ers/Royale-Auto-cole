import React, { useId } from 'react';
import { Link } from '../lib/router.jsx';

const Y = '#F6B800';

function uid(raw) {
  return raw.replace(/[^a-zA-Z0-9]/g, '');
}

/* Blason : couronne + écu traversé par les deux bandes Royale */
export function Crest({ className = 'logo-crest', title, ...rest }) {
  const id = uid(useId());
  return (
    <svg className={className} viewBox="0 0 48 58" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} {...rest}>
      {title && <title>{title}</title>}
      <defs>
        <clipPath id={`cr${id}`}>
          <path d="M7 23h34v14c0 10-8 15.5-17 19C15 52.5 7 47 7 37z" />
        </clipPath>
      </defs>
      <path d="M9 17 12.5 5.5 19 12.5 24 2.5l5 10 6.5-7L39 17z" fill={Y} />
      <circle cx="12.5" cy="5.2" r="2" fill={Y} />
      <circle cx="24" cy="2.4" r="2.2" fill={Y} />
      <circle cx="35.5" cy="5.2" r="2" fill={Y} />
      <rect x="9" y="17.5" width="30" height="3.5" rx="1" fill={Y} />
      <path d="M7 23h34v14c0 10-8 15.5-17 19C15 52.5 7 47 7 37z" fill="#0E1422" />
      <g clipPath={`url(#cr${id})`}>
        <rect x="16.5" y="20" width="6" height="40" fill={Y} />
        <rect x="25.5" y="20" width="6" height="40" fill={Y} />
      </g>
      <path d="M7 23h34v14c0 10-8 15.5-17 19C15 52.5 7 47 7 37z" fill="none" stroke={Y} strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" aria-label="Royale Auto-école, retour à l’accueil" onClick={onClick}>
      <Crest />
      <span className="logo-word" aria-hidden="true">
        <span className="logo-script">Royale</span>
        <span className="logo-sub">AUTO-ÉCOLE</span>
      </span>
    </Link>
  );
}

/* La voiture Royale vue du dessus (nez vers le haut) — utilisable seule ou dans un autre SVG */
export function TopCarShape({ id }) {
  const body = 'M60 4C86 4 102 14 104 38l3 162c0 26-15 36-47 36S13 226 13 200l3-162C18 14 34 4 60 4z';
  return (
    <g>
      <defs>
        <linearGradient id={`tb${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#04060A" />
          <stop offset=".5" stopColor="#1B2335" />
          <stop offset="1" stopColor="#04060A" />
        </linearGradient>
        <linearGradient id={`tg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A5C7D" />
          <stop offset="1" stopColor="#0A0E16" />
        </linearGradient>
        <clipPath id={`tc${id}`}><path d={body} /></clipPath>
      </defs>
      <rect x="5" y="44" width="12" height="36" rx="5" fill="#000" />
      <rect x="103" y="44" width="12" height="36" rx="5" fill="#000" />
      <rect x="5" y="164" width="12" height="38" rx="5" fill="#000" />
      <rect x="103" y="164" width="12" height="38" rx="5" fill="#000" />
      <path d={body} fill={`url(#tb${id})`} />
      <g clipPath={`url(#tc${id})`}>
        <rect x="44" y="0" width="12" height="240" fill={Y} />
        <rect x="64" y="0" width="12" height="240" fill={Y} />
      </g>
      <path d="M24 102c4-21 16-32 36-32s32 11 36 32c-17-6-55-6-72 0z" fill={`url(#tg${id})`} />
      <path d="M30 176c15 6 45 6 60 0l-3 20c-14 5-40 5-54 0z" fill={`url(#tg${id})`} />
      <path d="M22 108c-2 20-2 46 0 64" stroke="#0A0E16" strokeWidth="6" strokeLinecap="round" />
      <path d="M98 108c2 20 2 46 0 64" stroke="#0A0E16" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="9" cy="100" rx="7" ry="4" fill="#05070B" />
      <ellipse cx="111" cy="100" rx="7" ry="4" fill="#05070B" />
      <path d="M22 24c6-10 13-14 22-14l-2 8c-8 0-13 3-18 9z" fill="#FFF1C9" />
      <path d="M98 24c-6-10-13-14-22-14l2 8c8 0 13 3 18 9z" fill="#FFF1C9" />
      <rect x="20" y="226" width="20" height="5" rx="2" fill="#E5484D" />
      <rect x="80" y="226" width="20" height="5" rx="2" fill="#E5484D" />
      <path d="M52 40h16v8c0 6-3.5 9.5-8 12-4.5-2.5-8-6-8-12z" fill="#0E1422" stroke={Y} strokeWidth="1.6" />
    </g>
  );
}

export function TopCar({ className, title }) {
  const id = uid(useId());
  return (
    <svg className={className} viewBox="0 0 120 240" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <TopCarShape id={id} />
    </svg>
  );
}

/* Panneau d'entrée d'agglomération (fond blanc, bord rouge) */
export function TownSign({ name = 'BREUIL-LE-VERT', className }) {
  return (
    <svg className={className} viewBox="0 0 240 92" role="img" aria-label={`Panneau d’entrée d’agglomération ${name}`}>
      <rect x="1" y="1" width="238" height="90" rx="9" fill="#fff" />
      <rect x="9" y="9" width="222" height="74" rx="5" fill="none" stroke="#CC0605" strokeWidth="6" />
      <text x="120" y="58" textAnchor="middle" fontFamily="Arial Narrow, Arial, Helvetica, sans-serif" fontWeight="700" fontSize="27" fill="#111" textLength="188" lengthAdjust="spacingAndGlyphs">{name}</text>
    </svg>
  );
}

export function Signal() {
  return (
    <span className="signal" aria-hidden="true"><i /><i /><i /></span>
  );
}

export function Stars({ n = 5, label }) {
  return (
    <span className="stars" role="img" aria-label={label || `${n} étoiles sur 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z" /></svg>
      ))}
    </span>
  );
}

export function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 3v11.5a4 4 0 1 1-4-4" />
      <path d="M15 3c.5 2.6 2.3 4.4 5 4.8" />
    </svg>
  );
}
