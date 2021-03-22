const path = require('path');

module.exports = {
  entry: './src/carousel.tsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules|tests)/,
      },
      {
        test: /\.s?css$/,
        use: [
          'isomorphic-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'carousel.js',
    path: path.resolve(__dirname, 'pkg'),
    library: '',
    libraryTarget: 'commonjs',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  devtool: 'inline-source-map',
};
