import React from 'react';

/* Panneaux routiers français dessinés en SVG (viewBox 0 0 100 100) */
const R = '#CC0605';
const B = '#1C52A3';
const J = '#F9B000';
const K = '#111111';
const W = '#FFFFFF';
const FONT = 'Arial, Helvetica, sans-serif';

const Danger = ({ children }) => (
  <>
    <path d="M50 10 92 84H8z" fill={W} stroke={W} strokeWidth="16" strokeLinejoin="round" />
    <path d="M50 10 92 84H8z" fill={W} stroke={R} strokeWidth="10" strokeLinejoin="round" />
    {children}
  </>
);
const Forbid = ({ children, inner = W }) => (
  <>
    <circle cx="50" cy="50" r="47" fill={W} />
    <circle cx="50" cy="50" r="39.5" fill={inner} stroke={R} strokeWidth="11" />
    {children}
  </>
);
const Mandatory = ({ children }) => (
  <>
    <circle cx="50" cy="50" r="47" fill={W} />
    <circle cx="50" cy="50" r="44" fill={B} />
    {children}
  </>
);
const Info = ({ children }) => (
  <>
    <rect x="5" y="5" width="90" height="90" rx="11" fill={W} />
    <rect x="8" y="8" width="84" height="84" rx="9" fill={B} />
    {children}
  </>
);
const ArrowUp = ({ fill = W }) => <path d="M50 18 72 44H58v38H42V44H28z" fill={fill} />;
const Num = ({ v, fill = K, size = 36 }) => (
  <text x="50" y={50 + size * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize={size} fill={fill}>{v}</text>
);

export function signShapes(id) {
  switch (id) {
    case 'stop':
      return (
        <>
          <polygon points="92.5,67.6 67.6,92.5 32.4,92.5 7.5,67.6 7.5,32.4 32.4,7.5 67.6,7.5 92.5,32.4" fill={R} stroke={W} strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="86.5,65 65,86.5 35,86.5 13.5,65 13.5,35 35,13.5 65,13.5 86.5,35" fill="none" stroke={W} strokeWidth="1.6" />
          <text x="50" y="59.5" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="25" fill={W} letterSpacing="0.5">STOP</text>
        </>
      );
    case 'cedez':
      return (
        <>
          <path d="M8 16h84L50 90z" fill={W} stroke={W} strokeWidth="16" strokeLinejoin="round" />
          <path d="M8 16h84L50 90z" fill={W} stroke={R} strokeWidth="10" strokeLinejoin="round" />
        </>
      );
    case 'prioritaire':
      return (
        <>
          <polygon points="50,3 97,50 50,97 3,50" fill={W} stroke="#2a2a2a" strokeWidth="1.5" />
          <polygon points="50,17 83,50 50,83 17,50" fill={J} />
        </>
      );
    case 'priorite-droite':
      return <Danger><path d="M38 47 62 76M62 47 38 76" stroke={K} strokeWidth="6.5" /></Danger>;
    case 'intersection-prioritaire':
      return <Danger><rect x="45" y="36" width="10" height="42" fill={K} /><rect x="34" y="57" width="32" height="5" fill={K} /></Danger>;
    case 'autres-dangers':
      return <Danger><rect x="45.5" y="36" width="9" height="27" rx="3" fill={K} /><circle cx="50" cy="71.5" r="5" fill={K} /></Danger>;
    case 'feux':
      return (
        <Danger>
          <rect x="42" y="36" width="16" height="43" rx="4" fill={K} />
          <circle cx="50" cy="45.5" r="4.6" fill={R} />
          <circle cx="50" cy="57.5" r="4.6" fill={J} />
          <circle cx="50" cy="69.5" r="4.6" fill="#1E9E4A" />
        </Danger>
      );
    case 'virage-droite':
      return <Danger><path d="M44 79V61c0-12 6-18 18-19" stroke={K} strokeWidth="7" fill="none" /></Danger>;
    case 'retrecie':
      return (
        <Danger>
          <path d="M38 80V69c0-5 6-8 6-13V40" stroke={K} strokeWidth="5.5" fill="none" />
          <path d="M62 80V69c0-5-6-8-6-13V40" stroke={K} strokeWidth="5.5" fill="none" />
        </Danger>
      );
    case 'sens-interdit':
      return (
        <>
          <circle cx="50" cy="50" r="46" fill={R} stroke={W} strokeWidth="3" />
          <rect x="19" y="41" width="62" height="18" fill={W} />
        </>
      );
    case 'limite-50':
      return <Forbid><Num v="50" size={35} /></Forbid>;
    case 'stationnement-interdit':
      return <Forbid inner={B}><path d="M28 28 72 72" stroke={R} strokeWidth="9" /></Forbid>;
    case 'arret-interdit':
      return <Forbid inner={B}><path d="M28 28 72 72M72 28 28 72" stroke={R} strokeWidth="9" /></Forbid>;
    case 'tout-droit':
      return <Mandatory><ArrowUp /></Mandatory>;
    case 'contournement-droite':
      return <Mandatory><g transform="rotate(135 50 50)"><ArrowUp /></g></Mandatory>;
    case 'tourner-droite':
      return (
        <Mandatory>
          <path d="M41 82V54c0-10 6-16 16-16h4" stroke={W} strokeWidth="13" fill="none" />
          <path d="M58 22 80 38 58 54z" fill={W} />
        </Mandatory>
      );
    case 'vitesse-mini':
      return <Mandatory><Num v="30" fill={W} size={36} /></Mandatory>;
    case 'parking':
      return <Info><text x="50" y="72" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="62" fill={W}>P</text></Info>;
    case 'sens-unique':
      return <Info><ArrowUp /></Info>;
    case 'impasse':
      return <Info><rect x="42" y="38" width="16" height="44" fill={W} /><rect x="25" y="22" width="50" height="16" fill={R} /></Info>;
    case 'vitesse-conseillee':
      return <Info><Num v="70" fill={W} size={38} /></Info>;
    default:
      return null;
  }
}

export default function RoadSign({ id, className, label }) {
  return (
    <svg className={className} viewBox="0 0 100 100" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {signShapes(id)}
    </svg>
  );
}
