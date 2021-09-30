const {pnpPlugin} = require('@yarnpkg/esbuild-plugin-pnp');
const esbuild = require('esbuild');

console.log('BUILD');
esbuild.build({
  plugins: [pnpPlugin()],
  bundle: true,
  entryPoints: ['dist/src/run.js'],
  outfile: 'dist/cli.js',
}).catch((e) => {
  console.log('Build not successfult', e.message);
  process.exit(1);}
);