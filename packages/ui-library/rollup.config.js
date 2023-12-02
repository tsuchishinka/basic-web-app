import fs from 'fs'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default {
  input: './src/index.ts',
  output: {
    name: pkg.name,
    sourcemap: false,
    dir: './dist',
    format: 'es',
    preserveModulesRoot: 'src',
    globals: { react: 'React' },
  },
  plugins: [
    commonjs(),
    resolve({ moduleDirectories: ['node_modules'] }),
    postcss({
      minimize: true,
      modules: true,
      use: ['sass'],
      plugins: [autoprefixer()],
      extract: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    typescript({
      exclude: ['**/*.stories.tsx'],
    }),
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
}
