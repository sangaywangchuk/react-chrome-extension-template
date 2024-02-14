const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss')

module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts')
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          // options: {
          //   postcssOptions: {
          //     indent: "postcss",
          //     plugins: [tailwindcss, autoprefixer]
          //   }
          // }
        }],
        test: /\.css$/i
      },
      {
        type: 'asset/resource',
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/public'),
          to: path.resolve('build')
        }
      ]
    }),
    ...getHtmlPlugins(['popup', 'options'])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => new HtmlPlugin({
    title: "React Extension",
    filename: `${chunk}.html`,
    chunks: [chunk]
  }))
}