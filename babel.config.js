// App/babel.config.js

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ESTE PLUGIN DEVE SER O ÚLTIMO NA LISTA
      'react-native-reanimated/plugin',
    ],
  };
};