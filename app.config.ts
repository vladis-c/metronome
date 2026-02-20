import {ConfigContext, ExpoConfig} from 'expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'metronome',
  slug: 'metronome',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  newArchEnabled: true,
  assetBundlePatterns: ['**/*'],
  updates: {enabled: false},
  plugins: ['expo-audio'],
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: 'com.vladisc.metronome',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.vladisc.metronome',
  },
});
