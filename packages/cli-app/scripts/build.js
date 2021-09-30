import {pnpPlugin} from '@yarnpkg/esbuild-plugin-pnp';

await build({
  plugins: [pnpPlugin()],
  bundle: true,
  entryPoints: ['dist/src/run.js'],
  outFile: 'dist/cli.js',
});