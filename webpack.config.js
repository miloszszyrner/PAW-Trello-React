module.exports = {
    entry: "./app",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              exclude: /node_modules/,
              loaders: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env','react'],
                  plugins: ['transform-runtime']
                }
              }
            }
        ],
    },
    devServer: {
      historyApiFallback: true,
    }
};
