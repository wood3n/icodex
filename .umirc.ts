import { defineConfig } from 'dumi';

const path = require('path');

export default defineConfig({
  title: 'icodex',
  favicon: '/images/favicon.ico',
  logo: '/images/redfat.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: '📝Blog',
      path: '/blog',
    },
    {
      title: 'JavaScript',
      path: '/js',
    },
    {
      title: 'React',
      path: '/react',
    },
    {
      title: 'Network',
      path: '/network',
    },
    {
      title: 'Translation',
      path: '/translation',
    },
    {
      title: 'CSS',
      path: '/css',
    },
    {
      title: 'Demo',
      path: '/demo',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/wood3n/icodex',
    },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  links: [
    // {
    //   rel: 'stylesheet',
    //   href: '/css/style.css',
    // },
    {
      rel: 'stylesheet',
      href: '/css/prism.css',
    },
    // {
    //   rel: 'stylesheet',
    //   href:
    //     '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-dark.min.css',
    // },
  ],
  styles: [`.__dumi-default-layout-hero{display:none !important}`],
  theme: {
    // '@c-text': '#c7c5c5',
  },
  scripts: [
    {
      src: '/scripts/prism.js',
    },
    // {
    //   src:
    //     '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js',
    // },
    // {
    //   src: '/scripts/hljs.js',
    // },
  ],
});
