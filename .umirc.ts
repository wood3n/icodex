import { defineConfig } from 'dumi';

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
      title: 'Translation',
      path: '/translation',
    },
    {
      title: 'Demo',
      path: '/demo',
    },
    {
      title: 'Other',
      path: '/other',
    },
  ],
  styles: [`.__dumi-default-layout-hero { min-height: calc(100vh - 300px); }`],
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
});
