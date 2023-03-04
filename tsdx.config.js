const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      })
    );
    config.plugins = config.plugins.map((p) =>
      p.name === 'replace'
        ? replace({
            preventAssignment: true,
          })
        : p
    );
    return config;
  },
};
