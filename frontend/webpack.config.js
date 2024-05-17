const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve files from public directory
    },
    port: 3002,
    open: true,
  },
  optimization: {
    // Add optimization settings as needed
  },
};
