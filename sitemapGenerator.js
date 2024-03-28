import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const links = [
  { url: '/', changefreq: 'daily', priority: 0.8 },
  // ajoutez ici d'autres routes
];

(async () => {
  const stream = new SitemapStream({ hostname: 'https://front.api.developart.studio' });

  links.forEach(link => {
    stream.write(link);
  });

  stream.end();

  const sitemap = await streamToPromise(stream).then(sm => sm.toString());

  createWriteStream(resolve('./public/sitemap.xml')).write(sitemap); 
})();