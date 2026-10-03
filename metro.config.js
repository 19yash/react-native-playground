const { getDefaultConfig } = require('expo/metro-config')

const config = (() => {
  const cfg = getDefaultConfig(__dirname)

  cfg.transformer = {
    ...cfg.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  }

  cfg.resolver = {
    ...cfg.resolver,
    assetExts: cfg.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...cfg.resolver.sourceExts, 'svg'],
    alias: {
      '@': './src',
      '@assets': './assets',
    },
  }

  return cfg
})()

module.exports = config
