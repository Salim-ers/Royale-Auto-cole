import { useEffect, useRef, useState } from 'react';
import { SITE, DAYS } from '../data/site.js';
import { seoFor } from '../data/seo.js';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update));
  }, []);
  return reduced;
}

/* Observe les éléments [data-reveal] de la page et ajoute .is-in à l'entrée dans l'écran */
export function useRevealScope(rootRef, key) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const els = Array.from(root.querySelectorAll('[data-reveal]:not(.is-in)'));
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, key]);
}

/* Parallaxe légère : [data-parallax="0.15"] (désactivée sur mobile et en mouvement réduit) */
export function useParallaxScope(rootRef, key) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const els = Array.from(root.querySelectorAll('[data-parallax]'));
    if (!els.length) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const enabled = window.innerWidth >= 900;
      els.forEach((el) => {
        if (!enabled) { el.style.transform = ''; return; }
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [rootRef, key]);
}

export function useInView(ref, { once = true, rootMargin = '0px 0px -10% 0px', threshold = 0.2 } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setInView(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) setInView(false);
    }, { rootMargin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin, threshold]);
  return inView;
}

export function useCountUp(target, { active, duration = 1700, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setValue(target); return undefined; }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/* ---------- Horaires : heure de Paris ---------- */
const WEEKDAY_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

function parisNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return { day: WEEKDAY_INDEX[get('weekday')] ?? 0, minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
}

const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

export function formatHour(hhmm) {
  const [h, m] = hhmm.split(':');
  return m === '00' ? `${parseInt(h, 10)}\u00a0h` : `${parseInt(h, 10)}\u00a0h\u00a0${m}`;
}

export function formatRanges(ranges) {
  if (!ranges.length) return 'Fermé';
  return ranges.map(([a, b]) => `${formatHour(a)} – ${formatHour(b)}`).join(', ');
}

export function useOpenStatus(kind = 'office') {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(parisNow());
    const id = setInterval(() => setNow(parisNow()), 60000);
    return () => clearInterval(id);
  }, []);
  const week = SITE.hours[kind];
  if (!now) return { today: null, open: false, label: 'Horaires d’accueil' };
  const todayRanges = week[now.day];
  const current = todayRanges.find(([a, b]) => now.minutes >= toMin(a) && now.minutes < toMin(b));
  if (current) return { today: now.day, open: true, label: `Ouvert jusqu’à ${formatHour(current[1])}` };
  const laterToday = todayRanges.find(([a]) => toMin(a) > now.minutes);
  if (laterToday) return { today: now.day, open: false, label: `Fermé, ouverture à ${formatHour(laterToday[0])}` };
  for (let i = 1; i <= 7; i += 1) {
    const d = (now.day + i) % 7;
    if (week[d].length) {
      const when = i === 1 ? 'demain' : DAYS[d].toLowerCase();
      return { today: now.day, open: false, label: `Fermé, réouverture ${when} à ${formatHour(week[d][0][0])}` };
    }
  }
  return { today: now.day, open: false, label: 'Fermé' };
}

/* ---------- SEO côté client ---------- */
function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector);
  if (!el && create) {
    el = document.createElement(create.tag);
    Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  if (el) el.setAttribute(attr, value);
}

export function useSEO(pathname) {
  useEffect(() => {
    const seo = seoFor(pathname);
    document.title = seo.title;
    const url = SITE.url + (pathname === '/' ? '/' : pathname);
    setMeta('meta[name="description"]', 'content', seo.description, { tag: 'meta', attrs: { name: 'description' } });
    setMeta('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } });
    setMeta('meta[property="og:title"]', 'content', seo.title, { tag: 'meta', attrs: { property: 'og:title' } });
    setMeta('meta[property="og:description"]', 'content', seo.description, { tag: 'meta', attrs: { property: 'og:description' } });
    setMeta('meta[property="og:url"]', 'content', url, { tag: 'meta', attrs: { property: 'og:url' } });
  }, [pathname]);
}

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
