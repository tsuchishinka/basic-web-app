import { build } from 'esbuild'

build({
  entryPoints: ['./src/main.ts'],
  outdir: './dist', // 出力先ディレクトリ
  platform: 'node', // 'node' 'browser' 'neutral' のいずれかを指定,
  bundle: true,
  external: [], // バンドルに含めたくないライブラリがある場合は、パッケージ名を文字列で列挙する,
})
