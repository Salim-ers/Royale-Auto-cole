import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouterProvider, defineRoutes, matchRoute, useRouter } from './lib/router.jsx';
import { useRevealScope, useParallaxScope, useSEO } from './lib/hooks.js';
import { Nav, Footer, MobileBar, Loader, PageCover } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Formations from './pages/Formations.jsx';
import Reglementation from './pages/Reglementation.jsx';
import Securite from './pages/Securite.jsx';
import Conseils from './pages/Conseils.jsx';
import Article from './pages/Article.jsx';
import Contact from './pages/Contact.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

defineRoutes([
  { path: '/', Page: Home },
  { path: '/qui-sommes-nous', Page: About },
  { path: '/formations', Page: Formations },
  { path: '/reglementation', Page: Reglementation },
  { path: '/securite-routiere', Page: Securite },
  { path: '/conseils', Page: Conseils },
  { path: '/conseils/:slug', Page: Article },
  { path: '/contact', Page: Contact },
  { path: '/mentions-legales', Page: () => <Legal type="mentions" /> },
  { path: '/confidentialite', Page: () => <Legal type="confidentialite" /> },
  { path: '/cookies', Page: () => <Legal type="cookies" /> },
]);

function Shell({ ssr }) {
  const { pathname, search, phase, navCount } = useRouter();
  const mainRef = useRef(null);
  const [loading, setLoading] = useState(!ssr);
  const endLoading = useCallback(() => setLoading(false), []);
  const { route, params } = matchRoute(pathname);
  const Page = route ? route.Page : NotFound;

  useSEO(pathname);
  useRevealScope(mainRef, pathname + search);
  useParallaxScope(mainRef, pathname);

  useEffect(() => {
    if (navCount > 0 && mainRef.current) mainRef.current.focus({ preventScroll: true });
  }, [navCount]);

  return (
    <>
      <a className="skip-link" href="#contenu" onClick={(e) => { e.preventDefault(); if (mainRef.current) mainRef.current.focus(); }}>Aller au contenu</a>
      <Nav />
      <main id="contenu" ref={mainRef} tabIndex={-1} key={pathname + search}>
        <Page params={params} />
      </main>
      <Footer />
      <MobileBar />
      <PageCover phase={phase} />
      {loading && <Loader onDone={endLoading} />}
    </>
  );
}

export default function App({ initialPath = '/', ssr = false }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <Shell ssr={ssr} />
    </RouterProvider>
  );
}
