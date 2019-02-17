const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = compressionModule;

const filename = "[path].gz[query]";
const asset = "[path].br[query]";
const test = /\.(js|css|html|svg)$/;
const threshold = 0;
const minRatio = 0.8;

const brotli = {
  asset,
  test,
  threshold,
  minRatio
};

const gzip = {
  filename,
  test,
  threshold,
  minRatio
};

function compressionModule() {
  this.extendBuild((config, { isDev }) => {
    if (isDev) {
      return;
    }

    const options = this.options["nuxt-compress"];

    const brotliConfig = {
      ...brotli,
      ...options.brotli
    };

    const gzipConfig = {
      ...gzip,
      ...options.gzip
    };

    config.plugins.push(
      new CompressionPlugin(gzipConfig),
      new BrotliPlugin(brotliConfig)
    );
  });
}