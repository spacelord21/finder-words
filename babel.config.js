module.exports = function(api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [".tsx", ".ts"],
          alias: {
            '@shared': './src/shared',
            '@features': './src/features',
            '@widgets': './src/widgets',
            '@screens': './src/screens',
            '@app': './src/app',
            '@entities' : './src/entities'
          },
        },
      ],
    ],
  };
};
