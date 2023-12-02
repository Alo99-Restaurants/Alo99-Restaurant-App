import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

NativeWindStyleSheet.setOutput({
  default: 'native'
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

/**
 * RootLayoutNav
 * [Stack.Screen - options props](https://reactnavigation.org/docs/native-stack-navigator#options)
 * @returns
 */
function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(modals)/login' options={{ presentation: 'modal' }} />
    </Stack>
  );
}
