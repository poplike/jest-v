module.exports = {
  presets: [['@babel/preset-env', { modules: false }]],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },
  plugins: ['transform-es2015-modules-commonjs'],
};
