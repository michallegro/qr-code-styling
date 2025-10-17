const commonConfig = require('./webpack.config.common.js');
const config = commonConfig;

module.exports = (env, argv) => {
  config.mode = argv.mode;

  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
    config.watch = true;
  }

  if (argv.mode === "production") {
    config.devtool = "source-map";
  }

  return [
    {
      ...config
    },
    {
      ...config,
      output: {
        ...config.output,
        filename: "qr-code-styling.common.js",
        libraryTarget: "commonjs",
        library: undefined // Remove library name for CommonJS
      }
    },
    {
      ...config,
      output: {
        ...config.output,
        filename: "qr-code-styling.esm.js",
        libraryTarget: "module",
        library: undefined // Remove library name for ES modules
      },
      experiments: {
        outputModule: true
      }
    }
  ];
};
