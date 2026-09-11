import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { seoFor, allRoutes, localBusinessJsonLd } from './data/seo.js';
import { SITE } from './data/site.js';
import { ARTICLES } from './data/articles.js';

export function render(url) {
  return renderToString(<App initialPath={url} ssr />);
}

export { seoFor, allRoutes, localBusinessJsonLd, SITE, ARTICLES };
