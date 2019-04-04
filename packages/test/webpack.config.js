module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
}
