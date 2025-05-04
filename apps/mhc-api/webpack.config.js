const path = require('path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');


module.exports = {
  output: {
    path: join(__dirname, 'dist'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    })
  ],
  ignoreWarnings: [
    {
      module: /@google-cloud\/firestore/,
      message: /Failed to parse source map/,
    },
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@mhc-api/firestore': path.resolve(__dirname, '../../libs/shared/firestore/src/index.ts'),
      '@mhc-api/storage': path.resolve(__dirname, '../../libs/shared/storage/src/index.ts'),
    },
  }
};

