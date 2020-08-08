import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'icodex',
  favicon: '/images/favicon.ico',
  logo: '/images/redfat.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: 'JavaScript',
      path: '/js',
    },
    {
      title: 'react',
      path: '/react',
    },
    {
      title: 'demo',
      path: '/demo',
    },
    {
      title: 'translation',
      path: '/translation',
    },
    {
      title: 'other',
      path: '/other',
    },
  ],
});
