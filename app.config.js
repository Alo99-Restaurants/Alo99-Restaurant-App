import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  ios: {
    bundleIdentifier: 'com.kyphans.Alo99Restaurant',
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GG_API_KEY_IOS
    }
  },
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GG_API_KEY_AND
      }
    },
    package: 'com.kyphans.Alo99Restaurant'
  }
});
