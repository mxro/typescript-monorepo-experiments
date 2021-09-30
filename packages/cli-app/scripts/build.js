const {pnpPlugin} = require('@yarnpkg/esbuild-plugin-pnp');
const esbuild = require('esbuild');

esbuild.build({
  plugins: [pnpPlugin()],
  bundle: true,
  entryPoints: ['dist/src/run.js'],
  outfile: 'dist/cli.js',
}).catch((e) => {
  console.log('Build not successful', e.message);
  process.exit(1);}
);