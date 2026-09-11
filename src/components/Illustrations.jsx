import React, { useId } from 'react';
import { TopCarShape, Crest } from './Brand.jsx';
import { signShapes } from './RoadSign.jsx';

const Y = '#F6B800';
const BG = '#1D2536';
const ROAD = '#121827';
const LINE = 'rgba(255,255,255,.5)';
const uid = (raw) => raw.replace(/[^a-zA-Z0-9]/g, '');

const Frame = ({ children, label, view = '0 0 400 300' }) => (
  <svg viewBox={view} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <rect x="-200" y="-200" width="800" height="700" fill={BG} />
    <g opacity=".5">
      {Array.from({ length: 17 }).map((_, i) => <line key={`v${i}`} x1={i * 50 - 200} y1="-200" x2={i * 50 - 200} y2="500" stroke="rgba(255,255,255,.035)" />)}
      {Array.from({ length: 15 }).map((_, i) => <line key={`h${i}`} x1="-200" y1={i * 50 - 200} x2="600" y2={i * 50 - 200} stroke="rgba(255,255,255,.035)" />)}
    </g>
    {children}
  </svg>
);

const Sign = ({ id, x, y, s = 1, pole = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {pole > 0 && <rect x={50 * s - 2.5} y={90 * s} width="5" height={pole} fill="#8A93A0" />}
    <g transform={`scale(${s})`}>{signShapes(id)}</g>
  </g>
);

const Car = ({ x, y, s = 0.5, r = 0, id }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s}) translate(-60 -120)`}>
    <TopCarShape id={id} />
  </g>
);

function PermisB({ id, variant }) {
  return (
    <Frame label="Voiture Royale abordant une intersection" view={variant === 'tall' ? '70 -70 260 390' : undefined}>
      <rect x="-200" y="118" width="800" height="74" fill={ROAD} />
      <rect x="172" y="-200" width="76" height="700" fill={ROAD} />
      <path d="M-200 118h372M248 118h352M-200 192h372M248 192h352M172 -200v318M248 -200v318M172 192v308M248 192v308" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
      <path d="M-200 155h360M260 155h340M210 -200v306M210 204v296" stroke={LINE} strokeWidth="3" strokeDasharray="16 14" />
      {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={177 + i * 14.5} y="198" width="8" height="22" fill="rgba(255,255,255,.6)" />)}
      <rect x="210" y="226" width="38" height="4" fill="#fff" />
      <Car x={229} y={262} s={0.36} id={`pb${id}`} />
      <Sign id="cedez" x={268} y={60} s={0.34} pole={26} />
    </Frame>
  );
}

function AAC({ id }) {
  return (
    <Frame label="Borne kilométrique 3 000 km au bord d’une route">
      <path d="M-20 290C110 230 170 140 420 96" stroke={ROAD} strokeWidth="70" fill="none" />
      <path d="M-20 290C110 230 170 140 420 96" stroke={LINE} strokeWidth="3" strokeDasharray="16 14" fill="none" />
      <Car x={118} y={218} s={0.3} r={57} id={`aa${id}`} />
      <ellipse cx="292" cy="236" rx="52" ry="9" fill="rgba(0,0,0,.35)" />
      <g transform="translate(246 106)">
        <path d="M0 128V40a46 40 0 0 1 92 0v88z" fill="#fff" />
        <path d="M0 40a46 40 0 0 1 92 0v12H0z" fill={Y} />
        <text x="46" y="92" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="26" fill="#111">3 000</text>
        <text x="46" y="114" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="15" fill="#111">km</text>
      </g>
    </Frame>
  );
}

function Supervisee() {
  return (
    <Frame label="Volant avec les bandes Royale">
      <circle cx="200" cy="152" r="128" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
      <circle cx="200" cy="152" r="96" fill="none" stroke="#070A11" strokeWidth="28" />
      <circle cx="200" cy="152" r="110" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5" />
      <circle cx="200" cy="152" r="82" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
      <path d="M108 160h60l14-10M292 160h-60l-14-10" stroke="#070A11" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M200 186v58" stroke="#070A11" strokeWidth="20" strokeLinecap="round" />
      <circle cx="200" cy="152" r="36" fill="#0E1422" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" />
      <rect x="191" y="50" width="7" height="24" fill={Y} />
      <rect x="203" y="50" width="7" height="24" fill={Y} />
      <Crest className="" x="184" y="132" width="32" height="39" />
    </Frame>
  );
}

function Code() {
  return (
    <Frame label="Panneaux stop, cédez le passage et limitation à 50">
      <rect x="0" y="236" width="400" height="64" fill={ROAD} />
      <path d="M0 268h400" stroke={LINE} strokeWidth="3" strokeDasharray="16 14" />
      <Sign id="stop" x={44} y={70} s={0.86} pole={80} />
      <Sign id="cedez" x={160} y={104} s={0.76} pole={62} />
      <Sign id="limite-50" x={266} y={80} s={0.82} pole={76} />
      <g transform="translate(300 24)">
        <rect width="86" height="40" rx="10" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)" />
        <text x="43" y="27" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="19" fill="#fff">35/40</text>
      </g>
    </Frame>
  );
}

function Perf() {
  const cx = 200;
  const cy = 176;
  const r = 110;
  const pt = (deg, rad) => [cx + rad * Math.cos((deg * Math.PI) / 180), cy + rad * Math.sin((deg * Math.PI) / 180)];
  const [sx, sy] = pt(150, r);
  const [ex, ey] = pt(390, r);
  const [vx, vy] = pt(300, r);
  return (
    <Frame label="Compteur éco-conduite">
      <path d={`M${sx} ${sy}A${r} ${r} 0 1 1 ${ex} ${ey}`} stroke="#070A11" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d={`M${sx} ${sy}A${r} ${r} 0 0 1 ${vx} ${vy}`} stroke={Y} strokeWidth="6" fill="none" strokeLinecap="round" />
      {Array.from({ length: 13 }).map((_, i) => {
        const a = 150 + i * 20;
        const [x1, y1] = pt(a, r - 22);
        const [x2, y2] = pt(a, r - (i % 3 === 0 ? 38 : 30));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,.5)" strokeWidth={i % 3 === 0 ? 3 : 1.5} />;
      })}
      <g transform={`rotate(300 ${cx} ${cy})`}>
        <path d={`M${cx - 8} ${cy}L${cx + 88} ${cy - 2}L${cx + 88} ${cy + 2}Z`} fill="#fff" />
      </g>
      <circle cx={cx} cy={cy} r="12" fill="#0E1422" stroke="#fff" strokeWidth="3" />
      <path d="M200 256c-22-6-30-22-26-40 18 0 32 10 34 30 2-22 16-34 36-34 2 22-10 40-44 44z" fill="#3DD68C" opacity=".9" transform="translate(-20 -6) scale(1.1) translate(-2 -10)" />
    </Frame>
  );
}

function Examen({ id }) {
  return (
    <Frame label="Ligne d’arrivée en damier sur la route">
      <rect x="140" y="0" width="120" height="300" fill={ROAD} />
      <path d="M200 0v300" stroke={LINE} strokeWidth="3" strokeDasharray="16 14" />
      {Array.from({ length: 2 }).map((_, row) => Array.from({ length: 8 }).map((__, col) => (
        <rect key={`${row}-${col}`} x={140 + col * 15} y={96 + row * 15} width="15" height="15" fill={(row + col) % 2 ? '#fff' : '#111'} />
      )))}
      <rect x="112" y="0" width="12" height="300" fill={Y} opacity=".9" />
      <rect x="276" y="0" width="12" height="300" fill={Y} opacity=".9" />
      <Car x={200} y={196} s={0.4} id={`ex${id}`} />
    </Frame>
  );
}

function Stress() {
  return (
    <Frame label="Cercles de respiration">
      {[130, 104, 78, 52].map((rad, i) => (
        <circle key={rad} cx="200" cy="150" r={rad} fill="none" stroke={i === 3 ? Y : 'rgba(255,255,255,.18)'} strokeWidth={i === 3 ? 4 : 1.5} strokeDasharray={i === 0 ? '4 10' : undefined} />
      ))}
      <text x="200" y="146" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="#fff">4 · 6</text>
      <text x="200" y="170" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="12" fill="rgba(255,255,255,.7)">inspirer · expirer</text>
    </Frame>
  );
}

function Panneaux() {
  return (
    <Frame label="Panneaux stop, route prioritaire, sens interdit et direction obligatoire">
      <Sign id="stop" x={56} y={40} s={0.95} />
      <Sign id="prioritaire" x={166} y={20} s={0.9} />
      <Sign id="sens-interdit" x={246} y={120} s={0.95} />
      <Sign id="tout-droit" x={100} y={160} s={0.9} />
    </Frame>
  );
}

const MAP = { permisB: PermisB, aac: AAC, supervisee: Supervisee, code: Code, perf: Perf, examen: Examen, stress: Stress, panneaux: Panneaux };

export default function Illustration({ name, variant }) {
  const id = uid(useId());
  const Comp = MAP[name] || PermisB;
  return <Comp id={id} variant={variant} />;
}

/* Témoins lumineux du tableau de bord */
export function Telltale({ name }) {
  const id = uid(useId());
  switch (name) {
    case 'seatbelt':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <mask id={`sb${id}`}>
              <rect width="64" height="64" fill="#fff" />
              <path d="M22 26 44 58" stroke="#000" strokeWidth="6" />
            </mask>
          </defs>
          <g fill="currentColor" mask={`url(#sb${id})`}>
            <circle cx="32" cy="12" r="7" />
            <path d="M18 60V36c0-8 6-14 14-14s14 6 14 14v24z" />
          </g>
          <path d="M24.5 30 42 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
          <rect x="20" y="8" width="24" height="48" rx="5" />
          <path d="M29 48h6" />
          <path d="M8 22c-3 6-3 14 0 20M56 22c3 6 3 14 0 20" />
        </svg>
      );
    case 'alcohol':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 8h24l-2 18c-1 7-5 11-10 11s-9-4-10-11z" fill="currentColor" fillOpacity=".25" />
          <path d="M32 37v17M22 56h20" />
          <path d="M10 10 54 54" strokeWidth="4.5" />
        </svg>
      );
    case 'speed':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
          <path d="M10 46a24 24 0 1 1 44 0" />
          <path d="M32 40 44 24" />
          <circle cx="32" cy="40" r="3.5" fill="currentColor" />
          <path d="M16 30l3 2M48 30l-3 2M32 18v4" />
        </svg>
      );
    case 'distance':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="6" y="30" width="16" height="20" rx="4" fill="currentColor" fillOpacity=".25" />
          <rect x="42" y="30" width="16" height="20" rx="4" fill="currentColor" fillOpacity=".25" />
          <path d="M26 22h12M26 22l4-4M26 22l4 4M38 22l-4-4M38 22l-4 4" />
          <path d="M6 56h52" strokeDasharray="4 5" />
        </svg>
      );
    case 'sleep':
      return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M40 44A18 18 0 0 1 24 16a18 18 0 1 0 22 26 18 18 0 0 1-6 2z" fill="currentColor" fillOpacity=".25" />
          <path d="M40 10h10l-10 10h10" strokeWidth="3.5" />
        </svg>
      );
    default:
      return null;
  }
}
