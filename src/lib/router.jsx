import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

/* Routeur léger :
   - URLs propres (history API) sur le site publié ;
   - navigation en mémoire quand le site est affiché dans un cadre (aperçu) ;
   - transition « voiture qui passe » entre les pages. */

const RouterContext = createContext(null);
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function parse(full) {
  const [beforeHash, hash = ''] = String(full).split('#');
  const [rawPath, search = ''] = beforeHash.split('?');
  let pathname = rawPath || '/';
  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  return { pathname, search, hash };
}

function detectHistoryMode() {
  try {
    return typeof window !== 'undefined' && /^https?:$/.test(window.location.protocol) && window.self === window.top;
  } catch (e) {
    return false;
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function RouterProvider({ initialPath = '/', children }) {
  const historyMode = useRef(detectHistoryMode());
  const [loc, setLoc] = useState(() => {
    if (historyMode.current) {
      const { pathname, search, hash } = window.location;
      return parse(pathname + search + hash);
    }
    return parse(initialPath);
  });
  const [phase, setPhase] = useState('idle');
  const locRef = useRef(loc);
  const timers = useRef([]);
  const pendingScroll = useRef(null);
  const [navCount, setNavCount] = useState(0);

  locRef.current = loc;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const scrollToHash = (hash, smooth) => {
    const el = hash && document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' });
    return !!el;
  };

  const commit = useCallback((to, next, replace) => {
    if (historyMode.current) window.history[replace ? 'replaceState' : 'pushState']({}, '', to);
    pendingScroll.current = next.hash || 'top';
    setLoc(next);
    setNavCount((n) => n + 1);
  }, []);

  useIsoLayoutEffect(() => {
    const target = pendingScroll.current;
    if (!target) return;
    pendingScroll.current = null;
    if (target === 'top' || !scrollToHash(target, false)) window.scrollTo(0, 0);
  }, [loc]);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const next = parse(to);
    const current = locRef.current;
    if (next.pathname === current.pathname && next.search === current.search) {
      if (historyMode.current) window.history.replaceState({}, '', to);
      if (next.hash) {
        setLoc(next);
        scrollToHash(next.hash, true);
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
      return;
    }
    clearTimers();
    if (prefersReducedMotion()) {
      commit(to, next, replace);
      return;
    }
    setPhase('cover');
    timers.current.push(
      setTimeout(() => {
        commit(to, next, replace);
        setPhase('reveal');
        timers.current.push(setTimeout(() => setPhase('idle'), 560));
      }, 440)
    );
  }, [commit]);

  useEffect(() => {
    if (!historyMode.current) return undefined;
    const onPop = () => {
      const { pathname, search, hash } = window.location;
      pendingScroll.current = hash ? hash.slice(1) : 'top';
      setLoc(parse(pathname + search + hash));
      setNavCount((n) => n + 1);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => clearTimers, []);

  const value = useMemo(() => ({ ...loc, navigate, phase, navCount, query: new URLSearchParams(loc.search) }), [loc, navigate, phase, navCount]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter doit être utilisé dans <RouterProvider>');
  return ctx;
}

export function Link({ to, children, onClick, ...rest }) {
  const { navigate, pathname } = useRouter();
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);
  if (isExternal) {
    const newTab = /^https?:/.test(to);
    return (
      <a href={to} onClick={onClick} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  const current = parse(to).pathname === pathname;
  return (
    <a
      href={to}
      aria-current={current && !to.includes('#') ? 'page' : undefined}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

const ROUTES = [];
export function defineRoutes(list) {
  ROUTES.length = 0;
  list.forEach((r) => {
    const keys = [];
    const pattern = new RegExp('^' + r.path.replace(/:([a-z]+)/gi, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
    ROUTES.push({ ...r, pattern, keys });
  });
}

export function matchRoute(pathname) {
  for (const r of ROUTES) {
    const m = pathname.match(r.pattern);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
      return { route: r, params };
    }
  }
  return { route: null, params: {} };
}
