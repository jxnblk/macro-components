import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [{
    file: pkg.module,
    format: 'es',
    exports: 'named',
  }, {
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
  }],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [babel()],
}
