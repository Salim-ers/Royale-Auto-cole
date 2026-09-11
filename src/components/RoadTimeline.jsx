import React, { useEffect, useRef, useState } from 'react';
import { TopCar } from './Brand.jsx';

/* La voiture Royale suit une route sinueuse au fil du scroll et
   « peint » ses deux bandes jaunes derrière elle. */
export default function RoadTimeline({ steps }) {
  const wrapRef = useRef(null);
  const stepRefs = useRef([]);
  const pathRef = useRef(null);
  const trailRef = useRef(null);
  const trailGapRef = useRef(null);
  const carRef = useRef(null);
  const [geo, setGeo] = useState(null);
  const [passed, setPassed] = useState(-1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const compute = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const mobile = window.innerWidth <= 760;
      const cx = mobile ? 31 : w / 2;
      const amp = mobile ? 0 : Math.min(92, w * 0.075);
      const ys = stepRefs.current.filter(Boolean).map((el) => el.offsetTop + el.offsetHeight / 2);
      const pts = [[cx, 0], ...ys.map((y, i) => [cx + (i % 2 === 0 ? -amp : amp), y]), [cx, h]];
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i += 1) {
        const [x0, y0] = pts[i - 1];
        const [x1, y1] = pts[i];
        const dy = (y1 - y0) / 2;
        d += ` C${x0.toFixed(1)} ${(y0 + dy).toFixed(1)} ${x1.toFixed(1)} ${(y1 - dy).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      }
      setGeo({ d, w, h, ys, mobile });
    };
    compute();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(compute) : null;
    if (ro) ro.observe(wrap);
    window.addEventListener('resize', compute);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', compute); };
  }, [steps.length]);

  useEffect(() => {
    if (!geo || !pathRef.current) return undefined;
    const path = pathRef.current;
    const L = path.getTotalLength();
    [trailRef.current, trailGapRef.current].forEach((t) => { if (t) { t.style.strokeDasharray = `${L}`; } });
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrapRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = reduced ? 1 : (vh * 0.55 - rect.top) / rect.height;
      p = Math.max(0, Math.min(1, p));
      const len = p * L;
      const a = path.getPointAtLength(Math.max(0, Math.min(L, len - 1)));
      const b = path.getPointAtLength(Math.min(L, len + 1));
      const pt = path.getPointAtLength(len);
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90;
      if (carRef.current) carRef.current.style.transform = `translate(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px) rotate(${angle.toFixed(1)}deg)`;
      [trailRef.current, trailGapRef.current].forEach((t) => { if (t) t.style.strokeDashoffset = `${(L - len).toFixed(1)}`; });
      const idx = geo.ys.filter((y) => pt.y >= y - 12).length - 1;
      setPassed((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [geo]);

  const roadW = geo && geo.mobile ? 46 : 64;

  return (
    <div className="roadmap" ref={wrapRef}>
      {geo && (
        <svg className="roadmap-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
          <path d={geo.d} fill="none" stroke="#1D2536" strokeWidth={roadW} />
          <path d={geo.d} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth={roadW - 8} />
          <path ref={pathRef} d={geo.d} fill="none" stroke="#1D2536" strokeWidth={roadW - 14} />
          <path d={geo.d} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="2.5" strokeDasharray="18 16" />
          <path ref={trailRef} d={geo.d} fill="none" stroke="#F6B800" strokeWidth={geo.mobile ? 11 : 15} />
          <path ref={trailGapRef} d={geo.d} fill="none" stroke="#1D2536" strokeWidth={geo.mobile ? 3.5 : 5} />
        </svg>
      )}
      {geo && (
        <div className="roadmap-car" ref={carRef} aria-hidden="true">
          <TopCar />
        </div>
      )}
      <ol className="roadmap-steps">
        {steps.map((s, i) => (
          <li key={s.title} ref={(el) => { stepRefs.current[i] = el; }} className={`roadmap-step${i <= passed ? ' is-passed' : ''}`}>
            <div className="roadmap-card" data-reveal>
              <span className="roadmap-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h-card">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
