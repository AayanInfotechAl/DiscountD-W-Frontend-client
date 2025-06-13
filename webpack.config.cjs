const CompressionPlugin = require("compression-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production", // Ensure production mode is enabled

  entry: path.resolve(__dirname, "src/main.jsx"), // Entry file ka path
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: "asset/resource",
      },
      // JavaScript & JSX Loader
      {
        test: /\.(js|jsx)$/, // Handle .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // CSS Loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // SCSS Loader
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // Image Loader (JPG, PNG, GIF, SVG)
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      // PDF Loader
      {
        test: /\.pdf$/,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"], // Ensure Webpack resolves .jsx files
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Console logs remove karega
          },
          output: {
            comments: false, // Comments remove karega
          },
        },
      }),
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip", // GZIP compression enable
      test: /\.(js|css|html|svg)$/, // Compress these file types
      threshold: 10240, // Minimum file size (10KB) to compress
      minRatio: 0.8, // Compress only if size reduced by 20%
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 5 },
      gifsicle: { interlaced: true },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),
  ],
};
