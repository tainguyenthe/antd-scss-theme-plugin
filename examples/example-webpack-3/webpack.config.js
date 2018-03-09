const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


const isProduction = process.env.NODE_ENV === 'production';

const config = {
  devServer: {
    clientLogLevel: 'info',
    contentBase: './build/',
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    port: 9003,
    publicPath: '/',
    stats: {
      modules: false,
      chunks: false,
    },
  },
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'src', 'index.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
              modules: true,
              camelCase: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                '@primary-color': '#f60',
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
  ],
  watchOptions: {
    ignored: /build/,
  },
};


module.exports = config;
