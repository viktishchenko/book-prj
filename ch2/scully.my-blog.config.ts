import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'my-blog',
  outDir: './dist/static',
  routes: {
    '/blog/:id': {
      type: 'contentFolder',
      id: {
        folder: "./blog"
      }
    },},
};
