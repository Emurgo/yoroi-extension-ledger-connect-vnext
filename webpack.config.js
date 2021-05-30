const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Building config using function,
 * function parameter env='production' or 'development'
 */
module.exports = (env) => {
  const config = {};
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';

  const CleanPlugin = new CleanWebpackPlugin();

  const HtmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/assets/img/favicon.ico',
    chunksSortMode: 'none'
  });

  const DefinePlugin = new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(env),
    'process.env': {
      PUBLIC_URL: JSON.stringify(
        isDevelopment
          ? '/'
          : '/yoroi-extension-ledger-connect/'
      ) // Github pages uses the project name as the path
    },
  });

  const CopyPlugin = new CopyWebpackPlugin({
    patterns: [
      {
        from: 'static/update-ledger-app/',
        to: 'update-ledger-app',
        globOptions: { gitignore: true },
      },
    ],
  });

  config.entry = ['babel-polyfill', './src/index.js'];

  config.devServer = {
    historyApiFallback: true,
  };
  config.module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]',
              }
            },
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2|gif|png)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ]
  };

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
  };

  if (isProduction) {
    config.mode = 'production';

    config.output = {
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].[chunkhash].bundle.js',
      filename: '[name].[chunkhash].bundle.js'
    };

    config.plugins = [CleanPlugin, HtmlPlugin, DefinePlugin, CopyPlugin];
  }

  if (isDevelopment) {
    const AnalyzerPlugin = new BundleAnalyzerPlugin({
      analyzerMode: 'none'
    });

    config.mode = 'development';

    config.devtool = 'eval-source-map';

    config.output = {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js'
    };

    config.plugins = [CleanPlugin, HtmlPlugin, AnalyzerPlugin, DefinePlugin, CopyPlugin];
  }

  return config;
};
