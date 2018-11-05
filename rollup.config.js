import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

let url = 'http://localhost:8181/showcase';
if (process.env.BUILD === 'production')
  url = 'https://showcase.omnilogic.com.br/showcase';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true
  },
  external: ['react', 'react-dom'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API': JSON.stringify(url)
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    process.env.NODE_ENV === 'production' && uglify()
  ]
};
