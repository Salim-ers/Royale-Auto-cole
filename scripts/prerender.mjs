/* Génère une page HTML par route (titre, description, Open Graph, JSON-LD
   et contenu pré-rendu), plus 404.html, sitemap.xml et robots.txt. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, seoFor, allRoutes, localBusinessJsonLd, SITE, ARTICLES } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function headFor(url) {
  const seo = seoFor(url);
  const canonical = SITE.url + (url === '/' ? '/' : url);
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${seo.type || 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE.url}/og-image.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${json(localBusinessJsonLd())}</script>`,
  ];
  const article = ARTICLES.find((a) => `/conseils/${a.slug}` === url);
  if (article) {
    tags.push(`<script type="application/ld+json">${json({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      inLanguage: 'fr-FR',
      mainEntityOfPage: canonical,
      publisher: { '@id': `${SITE.url}/#auto-ecole` },
    })}</script>`);
  }
  return tags.join('\n    ');
}

const routes = allRoutes();
for (const url of routes) {
  const page = template.replace('<!--app-head-->', headFor(url)).replace('<!--app-html-->', render(url));
  const out = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
}

const notFound = template
  .replace('<!--app-head-->', `<title>Page introuvable | ${esc(SITE.name)}</title>\n    <meta name="robots" content="noindex" />`)
  .replace('<!--app-html-->', render('/page-introuvable'));
fs.writeFileSync(path.join(dist, '404.html'), notFound);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${SITE.url}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.startsWith('/conseils/') ? '0.6' : ['/mentions-legales', '/confidentialite', '/cookies'].includes(u) ? '0.2' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pré-rendu : ${routes.length} pages, 404.html, sitemap.xml, robots.txt`);
