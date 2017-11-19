const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rucksack = require('rucksack-css');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'lsd.common',
    filename: '[name].js',
    minChunks: 2
  }),
  new ExtractTextPlugin('[name].css', {allChunks: true})
];

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      }
    })
  )
}
const es6_loader = {
  test: /\.js|\.jsx|\.es6$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    plugins: [
      "transform-runtime"
    ],
    presets: ['es2015', 'stage-0']
  }
};
module.exports = {
  debug: !isProduction,
  devtool: false,
  entry: ["babel-polyfill",'./src/'],
  output: {
    path: path.join(__dirname, '../server/assets/'),
    filename: 'index.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  module: {
    loaders: [
      es6_loader,{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel?presets[]=es2015,presets[]=stage-0,plugins[]=babel-plugin-add-module-exports,plugins[]=transform-runtime'],

    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=babel-plugin-add-module-exports']
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }, {
      test: /\.jpe?g$|\.svg$|\.gif$|\.png$/i,
      loader: 'url-loader?limit=10000&name=images/[hash].png'
    }]
  },
  postcss: function () {
    return [
      rucksack(),
      require('autoprefixer'),
      require('precss')
    ];
  },
  eslint: {
    configFile: './.eslintrc',
    emitError: true,
    emitWarning: true
  },
  target: 'web',
  stats: false,
  progress: true
};
