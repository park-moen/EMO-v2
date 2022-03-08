module.exports = {
  presets: [
    ['@babel/preset-env', { targets: '> 0.25%, not dead', modules: 'cjs' }],
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
};
