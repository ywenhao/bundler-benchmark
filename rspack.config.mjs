import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rspack } from '@rspack/core'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default (env = {}, argv = {}) => {
  const production = argv.mode === 'production'
  const port = Number(env.port ?? 4175)

  return {
    name: 'rspack-benchmark',
    mode: production ? 'production' : 'development',
    target: ['web', 'es2022'],
    context: rootDir,
    entry: './src/main.tsx',
    output: {
      path: path.join(rootDir, 'dist/rspack'),
      filename: 'assets/[name]-[contenthash].js',
      chunkFilename: 'assets/[name]-[contenthash].js',
      assetModuleFilename: 'assets/[name]-[contenthash][ext]',
      clean: true,
      publicPath: 'auto',
    },
    devtool: false,
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'builtin:swc-loader',
              options: {
                jsc: {
                  parser: { syntax: 'typescript', tsx: true },
                  transform: { react: { runtime: 'automatic', development: !production } },
                  target: 'es2022',
                },
              },
            },
          ],
          type: 'javascript/auto',
        },
        {
          test: /\.css$/,
          use: [production ? rspack.CssExtractRspackPlugin.loader : 'style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new rspack.HtmlRspackPlugin({ template: path.join(rootDir, 'config/index.template.html') }),
      new rspack.DefinePlugin({ __BUNDLER__: JSON.stringify('rspack') }),
      ...(production
        ? [new rspack.CssExtractRspackPlugin({ filename: 'assets/[name]-[contenthash].css' })]
        : []),
    ],
    optimization: {
      minimize: production,
      runtimeChunk: 'single',
      splitChunks: { chunks: 'all' },
    },
    devServer: {
      host: '127.0.0.1',
      port,
      hot: true,
      historyApiFallback: true,
      static: false,
      client: { logging: 'none', overlay: true },
    },
    stats: 'errors-warnings',
    performance: { hints: false },
  }
}

