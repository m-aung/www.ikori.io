import path from 'path'; // ES 6 version
import HtmlWebpackPlugin from 'html-webpack-plugin'; // ES 6 version

const __dirname = path.resolve(); // ES 6 version

const config = {
  // the output bundle won't be optimized for production but suitable for development
  mode: 'development',
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    // the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, 'dist'),
    // the filename of the JS bundle will be bundle.js
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // for any file with a suffix of js or jsx
        test: /.(js|jsx)$/,
        // test: /\.jsx?$/, // jsx only
        // ignore transpiling JavaScript from node_modules as it should be that state
        exclude: /node_modules/,
        // use the babel-loader for transpiling JavaScript to a suitable format
        loader: 'babel-loader',
        options: {
          // attach the presets to the loader (most projects use .babelrc file instead)
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      // css loader
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
  ],
};

export default config;
